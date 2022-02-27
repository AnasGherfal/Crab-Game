class InputHandler
{
    constructor(game)
    {
        this.game = game;
        this.downX = -1;
        this.downY = -1;
    }

    keyDown(key)
    {
        if (key == "e") 
        {
            this.game.entities.forEach(entity => {
                if (entity.activatable)
                {
                    entity.activate();
                }
            });
        }
    }

    mouseDown(mouseX, mouseY)
    {
        // console.log("Mouse down");
        // 
        this.downX = mouseX;
        this.downY = mouseY;
        this.game.entities.forEach(entity => {
            if (entity.clickable)
            {
                entity.mouseClicked(mouseX, mouseY);
            }
        });
    }

    mouseHover(mouseX, mouseY)
    {
        this.game.entities.forEach(entity => {
            if (entity.hoverable)
            {
                entity.mouseHover(mouseX, mouseY);
            }
        });
    }

    mouseUp(mouseX, mouseY)
    {
        // console.log("Mouse up");
        console.log("Up (" + mouseX + ", " + mouseY + ")");
        console.log("Down (" + this.downX + ", " + this.downY + ")");
        console.log("FS (" + this.downX + ", " + this.downY + ", " + Math.abs(mouseX - this.downX) + ", " + Math.abs(mouseY - this.downY) + ")");
        this.game.entities.forEach(entity => {
            if (entity.hoverable)
            {
                entity.mouseUp(mouseX, mouseY);
            }
        });
    }

}