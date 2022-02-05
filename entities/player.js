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

        // this.particleSpawner = new ParticleSpawner(game, x + this.width / 2 * this.scale, y + this.height * this.scale);
        // this.children.push(this.particleSpawner);

        this.jumpCooldown = 100;
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

        

        if (this.jumpCooldown > 0)
        {
            this.jumpCooldown -= 1;
        }

        let dampenHorizontal = true;

        this.vx *= 0.94;

        if (this.y < this.game.height - this.height * this.scale)
        {
            this.vy += 0.25;
        }
        else
        {
            this.vy = 0;
        }

        if (this.game.keys != undefined)
        {
            if (this.game.keys["w"] && this.jumpCooldown == 0)
            {
                this.vy -= 10;
                this.jumpCooldown = 100;
                // this.particleSpawner.trigger();
            }

            if (this.game.keys["a"])
            {
                this.vx = -2;
                dampenHorizontal = false;
            }
            if (this.game.keys["d"])
            {
                if (dampenHorizontal)
                {
                    this.vx = 2;
                }
                else
                {
                    this.vx = 0;
                }
                dampenHorizontal = false;
            }
        }

        if (this.vx > 10)
        {
            this.vx = 10;
        }
        if (this.vx < -10)
        {
            this.vx = -10;
        }

        if (this.vy > 10)
        {
            this.vy = 10;
        }
        if (this.vy < -10)
        {
            this.vy = -10;
        }

        this.x += this.vx;
        this.y += this.vy;

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
        
        // var m = this.game.mouse;
        // if (m != null)
        // {
        //     ctx.lineTo(this.game.mouse.x, this.y + (this.scale * this.height/2));
        // }

        // ctx.stroke();

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);

        ctx.restore();
        
    }
}