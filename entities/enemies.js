class Zombie extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        this.width = 6;
        this.height = 90;
        this.scale = 0.7;


        //state 0 = idle 1 = walk 2 = attack
        this.state = 0;
        //direction 0 = right 1 = left
        this.direction = 0;

        //Sprite
        this.animator = [];
        this.loadAnimations();


        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);
        this.hitVector.invisible = true;

        this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
        this.children.push(this.healthBar);

        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(50, 0, 0, 1), rgba(0, 100, 5, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.corpseTimer = 100;
        this.onPlatform = false;
        this.isEnemy = true;


    }

    loadAnimations() {
        for (var i = 0; i < 3; i++) { // 3 states
            this.animator.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([]);
            }
        }


        //idel
        //facing right
        this.animator[0][0] = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 5, 7, 70, 100, 3, 0.5);

        //idel
        //facing Left
        this.animator[0][1] = new Animator(ASSET_MANAGER.getAsset("images/zombieFlipped.png"), 420, 7, -70, 100, 3, 0.5);

        // //walk
        // //facing right
        this.animator[1][0] = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 8, 468, 65, 120, 6, 0.2);

        // //walk 
        // //facing left
        this.animator[1][1] = new Animator(ASSET_MANAGER.getAsset("images/zombieFlipped.png"), 411, 470, -63, 200, 6, 0.2);

        //attack 
        //face right
        this.animator[2][0] = new Animator(ASSET_MANAGER.getAsset("images/zombieAttackJumpRun.png"), 13, 463, 75, 200, 6, 0.3);

        //attack 
        //face left
        this.animator[2][1] = new Animator(ASSET_MANAGER.getAsset("images/zombieAttackJumpRunFlipped.png"), 435, 463, -75, 200, 6, 0.3);


        //Animation for the zombie death, not implemented
        this.dead = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 21, 379, 60, 50, 3, 0.7)
    }


    update() {

        super.update();
        this.healthBar.setPercent(this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0) {
            this.die();
        }


        this.moveBy(this.vx * 10, this.vy);

        // COLLISION DETECTION
        let detected = false;
        for (let i = 0; i < this.game.entities.length; i++) {

            if (this.game.entities[i].isPlayer) {
                let player = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= player.x && this.x <= player.x + player.width) {
                    if (this.y + (this.height * this.scale) >= player.y && this.y <= player.y + player.height) {
                        this.state = 2;
                        this.vx = 0;
                        player.changeHealth(-.0065);
                    }
                } else {
                    if (this.x < player.x) {
                        this.state = 1;
                        this.direction = 0;
                        this.vx = Math.random() * (.15 - .001) + .001;
                    } else if (this.x > player.x) {
                        this.state = 1;
                        this.direction = 1;
                        this.vx = -(Math.random() * (.15 - .001) + .001);
                    } else {
                        this.state = 0;
                        this.vx = 0;
                        player.changeHealth(-.0065);
                    }

                }
            }


            if (this.game.entities[i].collisions) {
                let thePlatform = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= thePlatform.x && this.x <= thePlatform.x + thePlatform.width) {
                    let zombieAdjustedHeight = (thePlatform.y - (this.height * this.scale));
                    if (this.y < zombieAdjustedHeight) {

                        if (this.vy >= 0 && this.y > zombieAdjustedHeight - 10 && this.y < zombieAdjustedHeight + 10) {
                            console.log(this.y + ", " + (zombieAdjustedHeight))

                            this.onPlatform = true;
                        }

                        detected = true;
                        thePlatform.platformRect.color = rgba(255, 100, 100, 1);
                    }
                }

                if (detected == false) {
                    thePlatform.platformRect.color = rgba(0, 100, 100, 1);
                }
            }
            if (detected == false) {
                this.onPlatform = false;
            }
        }


        if (this.y < this.game.height - this.height * this.scale && this.onPlatform == false) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }

        if (this.vx > 10) {
            this.vx = 10;
        }
        if (this.vx < -10) {
            this.vx = -10;
        }

        if (this.vy > 10) {
            this.vy = 10;
        }
        if (this.vy < -10) {
            this.vy = -10;
        }

        // this.x += this.vx;

        this.moveBy(this.vx, 0);

        // this.y += this.vy;

        // if (abs(this.vx) < 0.0001) {
        //     this.vx = 0;
        // }

    }

    die() {
        if (this.corpseTimer-- == 90) {
            this.particleSpawner.spawnParticles(100);
            this.vx += 5;
            this.vy -= 5;
        } else if (this.corpseTimer > 0) {
            this.corpseTimer--;
            this.vy += 0.5;
            this.vx *= 0.99;
            this.vy *= 0.99;
        } else {
            this.removeFromWorld = true;
        }

    }

    changeHealth(amount) {
        if (amount < 0) {
            this.particleSpawner.spawnParticles(10, (this.x < this.game.sceneManager.player.x ? -1 : 1));
        }
        this.currentHealth += amount;
    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x - this.game.camera.x, this.y, text, 100));
    }

    draw(ctx) {
        ctx.save();


        super.draw(ctx);
        if (this.direction == 1) {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 60, this.y, this.scale);
        } else {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        }


        ctx.restore();

    }

};

class Slime extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        this.width = 6;
        this.height = 22;
        this.scale = 2.5;


        //state 0 = idle 1 = walk 
        this.state = 0;
        //direction 0 = right 1 = left
        this.direction = 0;

        //Sprite
        this.animator = [];
        this.loadAnimations();


        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);
        this.hitVector.invisible = true;

        this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
        this.children.push(this.healthBar);

        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(50, 0, 0, 1), rgba(0, 100, 5, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 80;
        this.maxHealth = 80;
        this.corpseTimer = 100;
        this.onPlatform = false;
        this.isEnemy = true;


    }

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 states
            this.animator.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([]);
            }
        }


        //idel
        //facing right
        this.animator[0][0] = new Animator(ASSET_MANAGER.getAsset("images/slime.png"), 7, 0, 20, 30, 2, 0.2);

        //idel
        //facing Left
        this.animator[0][1] = new Animator(ASSET_MANAGER.getAsset("images/slimeFlipped.png"), 130, 0, -20, 32, 2, 0.2);

        // //walk
        // //facing right
        this.animator[1][0] = new Animator(ASSET_MANAGER.getAsset("images/slime.png"), 3, 0, 22, 32, 5, 0.2);

        // //walk 
        // //facing left
        this.animator[1][1] = new Animator(ASSET_MANAGER.getAsset("images/slimeFlipped.png"), 130, 0, -22, 32, 5, 0.2);


    }


    update() {

        super.update();
        this.healthBar.setPercent(this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0) {
            this.die();
        }


        this.moveBy(this.vx * 15, this.vy);

        // COLLISION DETECTION
        let detected = false;
        for (let i = 0; i < this.game.entities.length; i++) {

            if (this.game.entities[i].isPlayer) {
                let player = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= player.x && this.x <= player.x + player.width) {
                    if (this.y + (this.height * this.scale) >= player.y && this.y <= player.y + player.height) {
                        this.state = 0;
                        this.vx = 0;
                        player.changeHealth(-.0045);
                    }
                } else {
                    if (this.x < player.x) {
                        this.state = 1;
                        this.direction = 0;
                        this.vx = Math.random() * (.15 - .001) + .001;
                    } else if (this.x > player.x) {
                        this.state = 1;
                        this.direction = 1;
                        this.vx = -(Math.random() * (.15 - .001) + .001);
                    } else {
                        this.state = 0;
                        this.vx = 0;
                        player.changeHealth(-.0045);
                    }

                }
            }


            if (this.game.entities[i].collisions) {
                let thePlatform = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= thePlatform.x && this.x <= thePlatform.x + thePlatform.width) {
                    let slimeAdjustedHeight = (thePlatform.y - (this.height * this.scale));
                    if (this.y < slimeAdjustedHeight) {

                        if (this.vy >= 0 && this.y > slimeAdjustedHeight - 10 && this.y < slimeAdjustedHeight + 10) {
                            console.log(this.y + ", " + (slimeAdjustedHeight))

                            this.onPlatform = true;
                        }

                        detected = true;
                        thePlatform.platformRect.color = rgba(255, 100, 100, 1);
                    }
                }

                if (detected == false) {
                    thePlatform.platformRect.color = rgba(0, 100, 100, 1);
                }
            }
            if (detected == false) {
                this.onPlatform = false;
            }
        }


        if (this.y < this.game.height - this.height * this.scale && this.onPlatform == false) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }

        if (this.vx > 10) {
            this.vx = 10;
        }
        if (this.vx < -10) {
            this.vx = -10;
        }

        if (this.vy > 10) {
            this.vy = 10;
        }
        if (this.vy < -10) {
            this.vy = -10;
        }

        // this.x += this.vx;

        this.moveBy(this.vx, 0);

        // this.y += this.vy;

        // if (abs(this.vx) < 0.0001) {
        //     this.vx = 0;
        // }

    }

    die() {
        if (this.corpseTimer-- == 90) {
            this.particleSpawner.spawnParticles(100);
            this.vx += 5;
            this.vy -= 5;
        } else if (this.corpseTimer > 0) {
            this.corpseTimer--;
            this.vy += 0.5;
            this.vx *= 0.99;
            this.vy *= 0.99;
        } else {
            this.removeFromWorld = true;
        }

    }

    changeHealth(amount) {
        if (amount < 0) {
            this.particleSpawner.spawnParticles(10, (this.x < this.game.sceneManager.player.x ? -1 : 1));
        }
        this.currentHealth += amount;
    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x - this.game.camera.x, this.y, text, 100));
    }

    draw(ctx) {
        ctx.save();


        super.draw(ctx);


        if (this.direction == 1) {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 45, this.y, this.scale);
        } else {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        }


        ctx.restore();

    }

};

class Hatslime extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        this.width = 6;
        this.height = 75;
        this.scale = 0.5;


        //state 0 = idle 1 = walk 
        this.state = 0;
        //direction 0 = right 1 = left
        this.direction = 0;

        //Sprite
        this.animator = [];
        this.loadAnimations();


        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);
        this.hitVector.invisible = true;

        this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
        this.children.push(this.healthBar);

        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(50, 0, 0, 1), rgba(0, 100, 5, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 30;
        this.maxHealth = 30;
        this.corpseTimer = 100;
        this.onPlatform = false;
        this.isEnemy = true;


    }

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 states
            this.animator.push([]);
            for (var j = 0; j < 2; j++) { // two directions
                this.animator[i].push([]);
            }
        }


        //idel
        //facing right
        this.animator[0][0] = new Animator(ASSET_MANAGER.getAsset("images/hatSlime.png"), 7, 0, 70, 100, 2, 0.3);

        // idel
        // facing Left
        this.animator[0][1] = new Animator(ASSET_MANAGER.getAsset("images/hatSlimeFlipped.png"), 626, 0, -65, 100, 2, 0.2);

        // //walk
        // //facing right
        this.animator[1][0] = new Animator(ASSET_MANAGER.getAsset("images/hatSlime.png"), 7, 0, 70, 100, 5, 0.2);

        // //walk 
        // //facing left
        this.animator[1][1] = new Animator(ASSET_MANAGER.getAsset("images/hatSlimeFlipped.png"), 626, 0, -68, 100, 5, 0.2);


    }


    update() {

        super.update();
        this.healthBar.setPercent(this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0) {
            this.die();
        }


        this.moveBy(this.vx * 22, this.vy);

        // COLLISION DETECTION
        let detected = false;
        for (let i = 0; i < this.game.entities.length; i++) {

            if (this.game.entities[i].isPlayer) {
                let player = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= player.x && this.x <= player.x + player.width) {
                    if (this.y + (this.height * this.scale) >= player.y && this.y <= player.y + player.height) {
                        this.state = 0;
                        this.vx = 0;
                        player.changeHealth(-.0045);
                    }
                } else {
                    if (this.x < player.x) {
                        this.state = 1;
                        this.direction = 0;
                        this.vx = Math.random() * (.15 - .001) + .001;
                    } else if (this.x > player.x) {
                        this.state = 1;
                        this.direction = 1;
                        this.vx = -(Math.random() * (.15 - .001) + .001);
                    } else {
                        this.state = 0;
                        this.vx = 0;
                        player.changeHealth(-.0025);
                    }

                }
            }


            if (this.game.entities[i].collisions) {
                let thePlatform = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= thePlatform.x && this.x <= thePlatform.x + thePlatform.width) {
                    let slimeAdjustedHeight = (thePlatform.y - (this.height * this.scale));
                    if (this.y < slimeAdjustedHeight) {

                        if (this.vy >= 0 && this.y > slimeAdjustedHeight - 10 && this.y < slimeAdjustedHeight + 10) {
                            console.log(this.y + ", " + (slimeAdjustedHeight))

                            this.onPlatform = true;
                        }

                        detected = true;
                        thePlatform.platformRect.color = rgba(255, 100, 100, 1);
                    }
                }

                if (detected == false) {
                    thePlatform.platformRect.color = rgba(0, 100, 100, 1);
                }
            }
            if (detected == false) {
                this.onPlatform = false;
            }
        }


        if (this.y < this.game.height - this.height * this.scale && this.onPlatform == false) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }

        if (this.vx > 10) {
            this.vx = 10;
        }
        if (this.vx < -10) {
            this.vx = -10;
        }

        if (this.vy > 10) {
            this.vy = 10;
        }
        if (this.vy < -10) {
            this.vy = -10;
        }

        // this.x += this.vx;

        this.moveBy(this.vx, 0);

        // this.y += this.vy;

        // if (abs(this.vx) < 0.0001) {
        //     this.vx = 0;
        // }

    }

    die() {
        if (this.corpseTimer-- == 90) {
            this.particleSpawner.spawnParticles(100);
            this.vx += 5;
            this.vy -= 5;
        } else if (this.corpseTimer > 0) {
            this.corpseTimer--;
            this.vy += 0.5;
            this.vx *= 0.99;
            this.vy *= 0.99;
        } else {
            this.removeFromWorld = true;
        }

    }

    changeHealth(amount) {
        if (amount < 0) {
            this.particleSpawner.spawnParticles(10, (this.x < this.game.sceneManager.player.x ? -1 : 1));
        }
        this.currentHealth += amount;
    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x - this.game.camera.x, this.y, text, 100));
    }

    draw(ctx) {
        ctx.save();


        super.draw(ctx);


        if (this.direction == 1) {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + 45, this.y, this.scale);
        } else {
            this.animator[this.state][this.direction].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale);
        }


        ctx.restore();

    }

};


// class Dummy extends Entity {
//     constructor(game, x, y) {
//         super(game, x, y);

//         this.color = rgba(150, 0, 150, 1)

//         this.body = new Rectangle(game, x, y, 40, 80, this.color);
//         this.children.push(this.body);

//         this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
//         this.children.push(this.hitVector);

//         this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
//         this.children.push(this.healthBar);

//         this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(150, 0, 150, 1), rgba(160, 38, 37, 1)]);
//         this.children.push(this.particleSpawner);

//         //Properties
//         this.shootable = true;
//         this.currentHealth = 100;
//         this.maxHealth = 100;
//         this.corpseTimer = 100;
//     }

//     update() {
//         super.update();
//         this.healthBar.setPercent(this.currentHealth / this.maxHealth);

//         if (this.currentHealth <= 0) {
//             this.die();
//         }

//         this.moveBy(this.vx, this.vy);
//     }

//     die() {
//         if (this.corpseTimer-- == 100) {
//             this.particleSpawner.spawnParticles(1000);
//             this.vx += 5;
//             this.vy -= 5;
//         } else if (this.corpseTimer > 0) {
//             this.corpseTimer--;
//             this.vy += 0.5;
//             this.vx *= 0.99;
//             this.vy *= 0.99;
//         } else {
//             this.removeFromWorld = true;
//         }

//     }

//     changeHealth(amount) {
//         if (amount < 0) {
//             this.particleSpawner.spawnParticles(10, (this.x < this.game.sceneManager.player.x ? -1 : 1));
//         }
//         this.currentHealth += amount;
//     }

//     displayDamageText(text) {
//         this.children.push(new DamageIndicator(this.game, this.x - this.game.camera.x, this.y, text, 100));
//     }
// };