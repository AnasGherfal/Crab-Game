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

        //UI Panels
        // this.game.addEntity(new ProgressBar(game, 100, 200, 400, 30, rgb(160,38,37)));
        this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
        this.game.addEntity(this.playerHealthBar);

        //Player
        this.player = new Player(game, 400, 300);
        this.game.addEntity(this.player);

        //Zombie
        this.zombie = new Zombie(game, 200, 300);
        this.game.addEntity(this.zombie);

        //Platform
        this.platform = new Platform(game, 300, 600, 100, 10);
        this.game.addEntity(this.platform);

        //Clouds
        this.background = new Clouds(game, 0, 50);
        this.game.addEntity(this.background);
        this.background = new Clouds(game, 1236, 50);
        this.game.addEntity(this.background);


        //Tree

        this.background = new Tree(game, 900, 300);
        this.game.addEntity(this.background);
        this.background = new Tree(game, -80, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 0, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 50, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 150, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 100, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 250, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 200, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 350, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 300, 170);
        this.game.addEntity(this.background);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 450, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 400, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 550, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 500, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 650, 170);
        this.game.addEntity(this.background);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 600, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 750, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 700, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 850, 170);
        this.game.addEntity(this.background);
        this.background = new Tree(game, 800, 170);
        this.game.addEntity(this.background);




        this.background = new Sun(game, 900, 80);
        this.game.addEntity(this.background);

        //sky
        this.background = new Sky(game, 0, 80);
        this.game.addEntity(this.background);

        //Test Button
        this.testButton = new Button(game, 10, 710, 200, 50, rgba(26, 188, 156, 1.0), rgba(22, 160, 133, 1.0));
        this.testButton.onMouseClicked = function() {
            // this.game.addEntity(new DamageIndicator(game, 200, 300, "HIT!", 100));
        };
        this.game.addEntity(this.testButton);

        this.entityTracker = new EntityTracker(game, 10, 600, this.player);
        this.addEntity(this.entityTracker);

        // this.addEntity(new Circle(game, 200, 200, rgba(100, 0, 100, 1), 3));
        this.addEntity(new FloatingBalls(game, game.width, game.height));

    }

    addEntity(entity) {
        this.game.addEntity(entity);
    }

    update() {
        //1024 = canvas width
        //camera follow forward movement
        let camF = 1024 * 3 / 4;
        if (this.x < this.player.x - camF) this.x = this.player.x - camF;
        //camera follow backwards movement
        let camB = 1024 * 1 / 8;
        if (this.x > this.player.x - camB) this.x = this.player.x - camB;

        //zombie following player
        if (this.player.x - this.zombie.x < 30) {
            this.zombie.vx = 0;
        }

        //platform collistion detection
        /*
         if (this.player.vy + this.player.height <= this.platform.y && this.player.y +
             this.player.height + this.player.vy >= this.platform.y && this.player.x +
             this.player.width >= this.platform.x) {
             this.player.vy = 0
         } */

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