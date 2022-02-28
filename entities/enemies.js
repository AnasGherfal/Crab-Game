class Zombie extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        this.width = 6;
        this.height = 145;
        this.scale = 0.4;

        this.direction = 0;

        this.animator = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 154, 717, 89, 130, 6, 0.5);

        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);

        this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
        this.children.push(this.healthBar);

        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(150, 0, 150, 1), rgba(160, 38, 37, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.corpseTimer = 100;

    }


    update() {


        super.update();
        this.vx = 0.1;
        this.moveBy(this.vx, this.vy);


        // if (this.jumpCooldown > 0) {
        //     this.jumpCooldown -= 1;
        // }


        if (this.y < this.game.height - this.height * this.scale) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }
        this.x += this.vx;
        this.y += this.vy;


    }

    die() {
        if (this.corpseTimer-- == 100) {
            this.particleSpawner.spawnParticles(1000);
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

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);
        ctx.restore();

    }

};

class Bird extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        this.width = 10;
        this.height = 10;
        this.scale = 0.3;

        this.direction = 0;


        this.animator = new Animator(ASSET_MANAGER.getAsset("images/bird.png"), 70, 100, 180, 150, 6, 0.5);


        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(150, 0, 150, 1), rgba(160, 38, 37, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.corpseTimer = 100;
    }

    update() {
        super.update();
        this.vx = 0.1;
        this.moveBy(this.vx, this.vy);


        // if (this.y < this.game.height - this.height * this.scale) {
        //     this.vy += 0.25;
        // } else {
        //     this.vy = 0;
        // }
        // this.x += this.vx;
        // this.y += this.vy;


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

    die() {
        if (this.corpseTimer-- == 100) {
            this.particleSpawner.spawnParticles(1000);
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

    draw(ctx) {

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);
        ctx.restore();

    }
}

class Dummy extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        this.color = rgba(150, 0, 150, 1)

        this.body = new Rectangle(game, x, y, 40, 80, this.color);
        this.children.push(this.body);

        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);

        this.healthBar = new ProgressBar(game, x - 10, y - 20, 60, 10, rgb(160, 38, 37), true);
        this.children.push(this.healthBar);

        this.particleSpawner = new ParticleSpawner(game, x + 20, y + 40, [rgba(150, 0, 150, 1), rgba(160, 38, 37, 1)]);
        this.children.push(this.particleSpawner);

        //Properties
        this.shootable = true;
        this.currentHealth = 100;
        this.maxHealth = 100;
        this.corpseTimer = 100;
    }

    update() {
        super.update();
        this.healthBar.setPercent(this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0) {
            this.die();
        }

        this.moveBy(this.vx, this.vy);
    }

    die() {
        if (this.corpseTimer-- == 100) {
            this.particleSpawner.spawnParticles(1000);
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
};