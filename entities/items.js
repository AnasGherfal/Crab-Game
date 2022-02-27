class Item extends Entity
{
    constructor(game, x, y)
    {
        super(game, x, y);

        //Properties
        this.floatPercent = 0

        this.tempSprite = new Rectangle(this.game, x, y, 10, 10, rgba(100, 100, 200, 1));
        this.children.push(this.tempSprite);
    }

    update()
    {
        if (this.floatPercent >= 1.0)
        {
            this.floatPercent = 0.0;
        }
        else
        {
            this.floatPercent += 0.005
        }
    }

    draw(ctx)
    {
        let d = 5 * Math.sin(2 * Math.PI * this.floatPercent);
        this.moveBy(0, d);
        super.draw(ctx);
        this.moveBy(0, -d);
    }

}