class Thing {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("./stroll.png"), 0, 0, 16, 16, 3, 0.2);
        this.direction = 0;
        this.x = 500;
        this.y = 500;
        this.width = 16;
        this.height = 16;
        this.scale = 5;
    };

    trigger() {

    };

    update() {
        var m = this.game.mouse;
        
        if (m != null)
        {
            var xDistance = this.x + (this.scale * this.width/2) - m.x;
            var yDistance = this.y + (this.scale * this.height/2) - m.y;

            if (Math.abs(xDistance) > Math.abs(yDistance))
            {
                if (xDistance < 0)
                {
                    this.direction = 2;
                }
                else
                {
                    this.direction = 1;
                }
            }
            else
            {
                if (yDistance < 0)
                {
                    this.direction = 0;
                }
                else
                {
                    this.direction = 3;
                }
            }
        }

    };

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        var lineWidth = 800
        ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
        ctx.lineTo(this.x + (this.scale * this.width/2) + lineWidth, this.y + (this.scale * this.height/2) + lineWidth);
        ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
        ctx.lineTo(this.x + (this.scale * this.width/2) + lineWidth, this.y + (this.scale * this.height/2) - lineWidth);
        ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
        ctx.lineTo(this.x + (this.scale * this.width/2) - lineWidth, this.y + (this.scale * this.height/2) + lineWidth);
        ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
        ctx.lineTo(this.x + (this.scale * this.width/2) - lineWidth, this.y + (this.scale * this.height/2) - lineWidth);

        var m = this.game.mouse;
        if (m != null)
        {
            ctx.moveTo(this.x + (this.scale * this.width/2), this.y + (this.scale * this.height/2));
            if (this.direction == 1 || this.direction == 2)
            {
                ctx.lineTo(this.game.mouse.x, this.y + (this.scale * this.height/2));
                ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
            }
            else
            {
                ctx.lineTo(this.x + (this.scale * this.width/2), this.game.mouse.y);
                ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
            }
            
        }

        ctx.stroke();

        // ctx.beginPath();

        // ctx.stroke();

        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y, this.scale, this.direction);

        ctx.restore();
    };
}