class Player extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        //Sizing
        this.width = 33;
        this.height = 23;
        this.scale = 2;

        //Right = 0
        //Left  = 1
        this.direction = 0;

        //Flags
        this.clickable = true;
        this.hoverable = true;

        //state 0 = idle 1 = walk
        this.state = 0;

        //Sprite
        this.animator = [];
        this.animator[0] = new Animator(ASSET_MANAGER.getAsset("images/crabidle.png"), 0, 0, 32, 27, 4, 0.45);
        this.animator[1] = new Animator(ASSET_MANAGER.getAsset("images/crabwalk.png"), 0, 0, 33, 27, 4, 0.15);


        //Properties
        this.jumpCooldown = 100;
        this.currentHealth = 0.5;
        this.onPlatform = false;

        //Attached Objects
        this.hitVector = new Vector(game, x, y, x, y);
        this.children.push(this.hitVector);

        this.bulletShell = new ParticleSpawner(game, x, y, [rgba(255, 200, 0, 1)]);
        this.children.push(this.bulletShell);

        //Debug Options
        this.hitVector.invisible = false;
    }

    changeHealth(val) {
        this.currentHealth += val;
    }

    mouseClicked(mouseX, mouseY) {
        // this.displayDamageText(randomInt(10) + 1);
        this.bulletShell.spawnParticles(1, 0, -1);
        this.setHitVector();
        this.game.sceneManager.getHit(this.hitVector).forEach(entity => {
            let damage = -getRandomInteger(1, 10);
            entity.displayDamageText(damage); //Deal damage
            entity.changeHealth(damage);
        });

        //Debug Stuff
        //console.log(this.direction == 1 ? "RIGHT" : "LEFT");
    }

    displayDamageText(text) {

        let sX = this.game.sceneManager.x;
        let sY = this.game.sceneManager.y;

        this.children.push(new DamageIndicator(this.game, this.x - sX, this.y - sY, text, 100));
    }

    setHitVector() {
        let sX = this.game.sceneManager.x;
        let sY = this.game.sceneManager.y;

        var mouse = this.game.mouse;

        if (mouse != null) {
            let x1 = this.x + (this.width * this.scale / 2);
            let y1 = this.y + (this.height * this.scale / 2);

            let x2 = mouse.x + sX;
            let y2 = mouse.y;

            this.direction = x1 > x2 ? 0 : 1;

            let m = (y2 - y1) / (x2 - x1);

            let reach = 50;

            //Get x2 distance (with direction) and extend by reach
            x2 = (x2 - x1) * reach + x1;
            y2 = m * (x2 - x1) + y1;

            this.hitVector.x = x1;
            this.hitVector.y = y1;
            this.hitVector.x2 = x2;
            this.hitVector.y2 = y2;
        }
    }

    update() {
        super.update();

        this.setHitVector();

        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= 1;
        }

        let dampenHorizontal = true;

        this.vx *= 0.94;

        if (this.onPlatform) {
            this.currentHealth = 1;
        } else {
            this.currentHealth = 0.5;
        }

        // COLLISION DETECTION
        let detected = false;
        for (let i = 0; i < this.game.entities.length; i++) {
            if (this.game.entities[i].collisions) {
                let thePlatform = this.game.entities[i];
                if (this.x + (this.width * this.scale) >= thePlatform.x && this.x <= thePlatform.x + thePlatform.width) {
                    let playerAdjustedHeight = (thePlatform.y - (this.height * this.scale));
                    if (this.y < playerAdjustedHeight) {

                        if (this.vy >= 0 && this.y > playerAdjustedHeight - 10 && this.y < playerAdjustedHeight + 10) {
                            console.log(this.y + ", " + (playerAdjustedHeight))

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

        if (this.game.keys != undefined) {
            if (this.game.keys["w"] && this.jumpCooldown == 0) {
                this.vy -= 10;
                this.jumpCooldown = 100;
                // this.particleSpawner.trigger();
            }

            if (this.game.keys["a"] && this.x > 130) {
                this.vx = -2;
                this.state = 1;
                dampenHorizontal = false;
            } else {
                this.vx = 0;
                this.state = 0;
            }

            if (this.game.keys["d"] && this.x < 5000) {
                if (dampenHorizontal) {
                    this.vx = 2;
                    this.state = 1;
                } else {
                    this.vx = 0;
                    this.state = 0;
                }
                dampenHorizontal = false;
            }

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
        // this.y += this.vy;

        this.moveBy(this.vx, this.vy);

        if (abs(this.vx) < 0.0001) {
            this.vx = 0;
        }


    }

    draw(ctx) {

        ctx.save();
        // if (this.direction == 1) {
        //     ctx.scale(-1, 1);
        // }

        //Draw Aim Line
        ctx.beginPath();
        ctx.moveTo(this.x + (this.scale * this.width / 2), this.y + (this.scale * this.height / 2));

        super.draw(ctx);
        this.animator[this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, 0);

        ctx.restore();

    }
}