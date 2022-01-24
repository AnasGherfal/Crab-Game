class Rectangle extends Entity
{
    constructor(game, x, y, width, height, color = "rgba(0, 0, 0, 1.0)")
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.color = color;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

}

class RoundedRectangle extends Entity
{
    constructor(game, x, y, width, height, color)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.color = color;
        this.radius = 5;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;

        ctx.roundRect(this.x, this.y, this.width, this.height, this.radius);
        
        ctx.fill(); //TODO
        ctx.restore();
    }

}

class ImageEntity extends Entity
{
    constructor(game, x, y, image, width, height, opacity = 1.0)
    {
        super(game, x, y);
        
        this.image = image
        this.width = width;
        this.height = height;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();
        ctx.beginPath();
        // ctx.filter = "blur(5px)";
        ctx.imageSmoothingEnabled = false;
        ctx.globalAlpha = 0.4;
        ctx.scale(1, 1);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.filter = "none";
        ctx.restore();
    }
}
