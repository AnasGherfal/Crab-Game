class Player extends Entity
{
    constructor(game, x, y)
    {
        super(game, x, y);
        
        this.width = 6;
        this.height = 11;
        this.scale = 5;

        this.direction = 0;

        //Flags
        this.clickable = true;
        this.hoverable = true;

        this.animator = new Animator(ASSET_MANAGER.getAsset("images/riskPlayer.png"), 0, 0, 6, 11, 8, 0.2);

        // this.bitSpawner = new BitSpawner(game, x + this.width / 2 * this.scale, y + this.height * this.scale);
        // this.children.push(this.bitSpawner);
    }

    mouseClicked(mouseX, mouseY)
    {
        this.displayDamageText(randomInt(10) + 1);
    }

    displayDamageText(text)
    {
        this.children.push(new DamageIndicator(this.game, this.x, this.y, text, 100));
    }

    update()
    {
        super.update();

        let dampenHorizontal = true;

        this.vx *= 0.95;

        if (this.game.keys != undefined)
        {
            if (this.game.keys["a"])
            {
                this.vx = -1;
                dampenHorizontal = false;
            }
            if (this.game.keys["d"])
            {
                if (dampenHorizontal)
                {
                    this.vx = 1;
                }
                else
                {
                    this.vx = 0;
                }
                dampenHorizontal = false;
            }
        }

        this.x += this.vx;

        if (abs(this.vx) < 0.0001)
        {
            this.vx = 0;
        }

    }

    draw(ctx)
    {
        ctx.save();
        if (this.direction == 1)
        {
            ctx.scale(-1, 1);
        }

        //Draw Aim Line
        ctx.beginPath();
        ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
        
        var m = this.game.mouse;
        if (m != null)
        {
            ctx.lineTo(this.game.mouse.x, this.y + (this.scale * this.height/2));
        }

        ctx.stroke();

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale, this.direction);
        ctx.restore();
    }
}