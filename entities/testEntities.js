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

class FloatingBalls extends Entity
{
    constructor(game, width, height)
    {
        super(game, 0, 0);

        for (let i = 0; i < 100; i++)
        {
            let x = getRandomInteger(-width, width + width*2);
            let y = getRandomInteger(-height, height + height*2);
            let w = getRandomInteger(80, 150);
            let temp = new Circle(game, x, y, rgba(w, w, w, 0.1), 2);
            temp.vx = (Math.random() - 0.5) / 4;
            temp.vy = (Math.random() - 0.5) / 4;

            temp.timer = getRandomInteger(100, 1000);
            temp.initialTimerValue = temp.timer;

            temp.sceneElement = false;

            this.children.push(temp);

        }

    }

    update()
    {
        this.children.forEach(child => {
            if (child.timer != undefined)
            {
                child.timer--;
                if (child.timer == 0)
                {
                    child.vx = (Math.random() - 0.5) / 4;
                    child.vy = (Math.random() - 0.5) / 4;
                    child.timer = 1000;
                    child.initialTimerValue = 1000;
                }

                child.x += child.vx * Math.sin(Math.PI * ((child.initialTimerValue - child.timer) / child.initialTimerValue));
                child.y += child.vy * Math.sin(Math.PI * ((child.initialTimerValue - child.timer) / child.initialTimerValue));
            }
        });
    }

    draw(ctx)
    {
        ctx.save();

        let lastX = undefined, lastY = undefined, lastColor = undefined;
        let i = 0;
        for (const child of this.children)
        {
            if (child.timer != undefined)
            {
                if (lastX == undefined)
                {
                    lastX = child.x;
                    lastY = child.y;
                    lastColor = child.color;
                    continue;
                }
                
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(child.x, child.y);
                
                let color = child.color;
                let gradient = ctx.createLinearGradient(lastX, lastY, child.x, child.y);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, child.color);
                
                ctx.strokeStyle = gradient;
                ctx.stroke();

                lastX = child.x;
                lastY = child.y;

                child.draw(ctx);
            }
        }

        ctx.restore();
    }

}
