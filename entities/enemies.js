class Zombie extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        this.width = 6;
        this.height = 145;
        this.scale = 0.4;

        this.direction = 0;

        // this.clickable = true;
        // this.hoverable = true;

        this.animator = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 154, 717, 89, 130, 6, 0.5);

    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x, this.y, text, 100));
    }

    update() {

        super.update();


        // if (this.jumpCooldown > 0) {
        //     this.jumpCooldown -= 1;
        // }

        let dampenHorizontal = true;

        this.vx *= 0.94;

        if (this.y < this.game.height - this.height * this.scale) {
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

        this.x += this.vx;
        this.y += this.vy;

        if (abs(this.vx) < 0.0001) {
            this.vx = 0;
        }

    }

    draw(ctx) {

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale, this.direction);
        ctx.restore();

    }

}