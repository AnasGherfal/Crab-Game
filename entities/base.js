class Entity
{
    constructor(game, x, y)
    {
        //Defaults
        this.game = game;
        this.children = [];

        //Properties DONT UPDATE NEVER NEVER
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;

        //Flags
        this.removeFromWorld = false;
        this.affectedByGravity = false;
        this.clickable = false;
        this.hoverable = false;
    }

    moveBy(x, y)
    {
        this.x += x;
        this.y += y;

        //Update children's x and y
        this.children.forEach(child => {
            child.moveBy(x, y);
        });
    }

    setPos(x, y)
    {
        this.x = x;
        this.y = y;
    }

    update()
    {
        //Remove children marked for deletion
        this.children.filter(function(val) { return val !== null; }).join(", ");

        this.children.forEach(child => {
            child.update();
        });

        if (this.affectedByGravity)
        {
            this.vy += 0.25; //TODO replace with gravity constant
        }
    }

    draw(ctx)
    {
        ctx.save();

        // Runs through children and deletes and draws
        for (let i = 0; i < this.children.length; i++)
        {
            if (this.children[i].removeFromWorld)
            {
                delete this.children.splice(i, i + 1);
            }
            else
            {
                this.children[i].draw(ctx);
            }
        }

        ctx.restore();
    }

    mouseHover(mouseX, mouseY)
    {

    }

    mouseClicked(mouseX, mouseY)
    {
        
    }

    mouseUp(mouseX, mouseY)
    {

    }

}