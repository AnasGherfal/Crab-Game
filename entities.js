class BitSpawner {

    constructor(game, x, y)
    {
        this.game = game;
        this.x = x;
        this.y = y;

        this.bits = [];
    }

    trigger()
    {
        this.bits.push(new Bit(this.game, this.x, this.y));
    }

    update()
    {
        

        if (this.game.keys != undefined)
        {
            // if (this.game.keys["Control"])
            // {
            //     this.trigger();
            //     this.trigger();
            //     this.trigger();
            //     this.trigger();
            // }
        }
        else
        {
            // console.log("Not pressing a!");
        }

        this.bits.filter(function(val) { return val !== null; }).join(", ");

        for (let i = 0; i < this.bits.length; i++)
        {
            this.bits[i].update();
        }
    }

    draw(ctx)
    {
        for (let i = 0; i < this.bits.length; i++)
        {
            if (this.bits[i].markedForDeletion)
            {
                delete this.bits.splice(i, i + 1);
            }
            else
            {
                this.bits[i].draw(ctx)
            }
        }
    }
}

class Bit {

    constructor(game, x, y)
    {
        this.game = game;

        this.x = x;
        this.y = y;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;

        this.updateTick = 5;
        this.tick = 0;
        this.lifeSpan = 50;
        this.lifeSpanInit = this.lifeSpan;

        this.size = Math.random() * 5;

        this.markedForDeletion = false;
    }

    update()
    {
        this.tick += 1;
        if (this.tick >= this.updateTick) 
        {
            this.tick = 0;
            if (--this.lifeSpan <= 0)
            {
                this.markedForDeletion = true;
            }
        }
        this.updatePos();
    }

    updatePos()
    {
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.999;
        this.vy *= 0.999;

        this.vy += 0.1;
    }

    draw(ctx)
    {
        ctx.save();

        if (this.markedForDeletion) return;
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + Math.floor(((this.lifeSpanInit - this.lifeSpan)/this.lifeSpanInit)*50) + ', 100%, 50%)'
        
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.stroke();

        ctx.restore();
    }
}



