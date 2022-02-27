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

        this.collisions = false;
        this.shootable = false;
        this.invisible = false;

        this.sceneElement = true;
    }

    setSceneElement(val)
    {
        this.sceneElement = val;
        this.children.forEach(child => {
            console.log("Setting " + child);
            child.setSceneElement(val);
        });
    }

    getChildrenCount()
    {

        let c = 0;
        this.children.forEach(child => {
            c += child.getChildrenCount() + 1;
        });
        return c;
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
        if (this.invisible)
        {
            return;
        }

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

    getFormattedPosition()
    {
        return "(" + this.x + ", " + this.y + ")";
    }

    getFormattedVelocity()
    {
        return "(" + this.vx + ", " + this.vy + ")";
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
