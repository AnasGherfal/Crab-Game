class RainbowBox extends Rectangle
{
    constructor(game, x, y, width, height)
    {
        super(game, x, y, width, height, "rgba(255, 255, 255, 1)");
        this.r = 255;
        this.g = 255;
        this.b = 255;

        this.h = 0;
        this.s = 50;
        this.l = 50;
    }

    cycleColor()
    {
        this.r += 1;
        this.b += 2;
        this.b += 3;

        if (this.r > 255)
        {
            this.r = 0;
        }

        if (this.g > 255)
        {
            this.g = 0;
        }

        if (this.b > 255)
        {
            this.b = 0;
        }
    }

    cycleHSL()
    {
        this.h += 1;
        // this.s += 2;
        // this.l += 3;

        if (this.h > 360)
        {
            this.h = 0;
        }

        if (this.s > 100)
        {
            this.s = 0;
        }

        if (this.l > 100)
        {
            this.l = 0;
        }
    }

    update()
    {
        this.cycleHSL();
        // this.color = rgba(this.r, this.g, this.b, 1.0);
        this.color = hsl(this.h, this.s, this.l);
    }

}
