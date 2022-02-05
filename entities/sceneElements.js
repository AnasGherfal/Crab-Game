// class Background extends Entity {
//     constructor(game, images) {
//         super(game, 0, 0);
//     }
// }

class Scene extends Entity {
    constructor(game) {
        super(game, 0, 0);
        this.game.camera = this;
        this.x = 0;

        //Player
        this.player = new Player(game, 400, 300);
        this.game.addEntity(this.player);

        //Zombie
        this.zombie = new Zombie(game, 250, 300);
        this.game.addEntity(this.zombie);

        //Platform
        // this.platform = new Platform();
        // this.game.addEntity(this.platform);

        //Test Button
        this.testButton = new Button(game, 10, 710, 200, 50, rgba(26, 188, 156, 1.0), rgba(22, 160, 133, 1.0));
        this.testButton.onMouseClicked = function() {
            // this.game.addEntity(new DamageIndicator(game, 200, 300, "HIT!", 100));
        };
        this.game.addEntity(this.testButton);

        this.entityTracker = new EntityTracker(game, 10, 600, this.player);
        this.addEntity(this.entityTracker);

    }

    addEntity(entity) {
        this.game.addEntity(entity);

    }

    update() {
        //1024 = canvas width
        let midpoint = 1024 / 2;
        if (this.x < this.player.x - midpoint) this.x = this.player.x - midpoint;

        //zombie following player
        if (this.player.x - this.zombie.x > 30) {
            this.zombie.x++;
        } else if (this.player.x - this.zombie.x < -30) {
            this.zombie.x--;
        }

        //platform collistion detection

        // if (this.player.vy + this.player.height <= this.platform.positon.y && this.player.y +
        //     this.player.height + this.player.vy >= this.platform.positon.y && this.player.x +
        //     this.player.width >= this.platform.positon.x) {
        //     this.player.vy = 0
        // }


    }

}

class ParticleSpawner extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
    }

    trigger() {
        this.spawnBits();
    }

    spawnBits() {
        this.children.push(new Particle(this.game, this.x, this.y));
    }

    draw(ctx) {
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(ctx);
        }
    }

}

class Particle extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;

        this.updateTick = 5;
        this.tick = 0;
        this.lifeSpan = 50;
        this.lifeSpanInit = this.lifeSpan;

        this.size = Math.random() * 5;

        this.markedForDeletion = false; ////TODO
    }

    update() {
        this.tick += 1;
        if (this.tick >= this.updateTick) {
            this.tick = 0;
            if (--this.lifeSpan <= 0) {
                this.removeFromWorld = true;
            }
        }
        this.updatePos();
    }

    updatePos() {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.999;
        this.vy *= 0.999;

        this.vy += 0.1;
    }

    draw(ctx) {
        ctx.save();

        if (this.removeFromWorld) return;
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + Math.floor(((this.lifeSpanInit - this.lifeSpan) / this.lifeSpanInit) * 50) + ', 100%, 50%)'

        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.stroke();

        ctx.restore();
    }

}