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
        ctx.fillRect(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.width, this.height);
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

        ctx.roundRect(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.width, this.height, this.radius);
        
        ctx.fill(); //TODO
        ctx.restore();
    }

}

class Circle extends Entity
{
    constructor(game, x, y, color, radius)
    {
        super(game, x, y);

        this.color = color;
        this.radius = radius;
    }

    draw(ctx)
    {
        super.draw(ctx);
        ctx.save();

        ctx.beginPath();
        ctx.arc(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();

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
        ctx.filter = "blur(5px)";
        ctx.imageSmoothingEnabled = false;
        // ctx.globalAlpha = 0.4;
        ctx.scale(1, 1);
        ctx.drawImage(this.image, this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.width, this.height);
        ctx.filter = "none";
        ctx.restore();
    }
}

class Vector extends Entity
{
    constructor(game, x1, y1, x2, y2)
    {
        super(game, x1, y1);

        this.x2 = x2;
        this.y2 = y2;

        this.color = rgba(0, 0, 0, 1);
    }

    moveBy(x, y)
    {
        super.moveBy(x, y);
        this.x2 += x;
        this.y2 += y;
    }

    intersect(v2)
    {
        let x1 = this.x;
        let y1 = this.y;
        let x2 = this.x2;
        let y2 = this.y2;

        let x3 = v2.x;
        let y3 = v2.y;
        let x4 = v2.x2;
        let y4 = v2.y2;

        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (den == 0)
        {
            return;
        }

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;

        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t > 0 && t < 1 && u > 0 && u < 1)
        {
            return true;
        }
        else
        {
            return;
        }

    }

    draw(ctx)
    {
        if (this.invisible)
        {
            return;
        }

        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.moveTo(this.x - (this.sceneElement ? this.game.camera.x : 0), this.y);
        ctx.lineTo(this.x2 - (this.sceneElement ? this.game.camera.x : 0), this.y2);
        ctx.stroke();

        ctx.restore();

    }

    toString()
    {
        return "(" + this.x + ", " + this.y + "), (" + this.x2 + ", " + this.y2 + ")";
    }

}
