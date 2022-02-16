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


        // super.update();
        this.vx = 0.2;




        // if (this.jumpCooldown > 0) {
        //     this.jumpCooldown -= 1;
        // }

        let dampenHorizontal = true;

        if (this.y < this.game.height - this.height * this.scale) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }
        this.x += this.vx;
        this.y += this.vy;


    }

    draw(ctx) {

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);
        ctx.restore();

    }

}

class Dummy extends Entity
{
    constructor(game, x, y)
    {
        super(game, x, y);

        this.body = new Rectangle(game, x, y, 40, 80, rgba(150, 0, 150, 1));
        this.children.push(this.body);

        this.hitVector = new Vector(game, x + (20), y, x + (20), y + 80);
        this.children.push(this.hitVector);

        this.healthBar = new ProgressBar(game, x - 10, y - 30, 60, 20);
        this.children.push(this.healthBar);

        this.shootable = true;

        //Properties
        this.currentHealth = 100;
        this.maxHealth = 100;
    }

    update()
    {
        super.update();
        this.healthBar.setPercent(this.currentHealth / this.maxHealth);

        if (this.currentHealth <= 0)
        {
            this.die();
        }
    }

    die()
    {
        this.removeFromWorld = true;
    }

    changeHealth(amount)
    {
        this.currentHealth += amount;
    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x - this.game.camera.x, this.y, text, 100));
    }
}
