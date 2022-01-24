class InputHandler
{
    constructor(game)
    {
        this.game = game;
    }

    mouseDown(mouseX, mouseY)
    {
        console.log("Mouse down");
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
        console.log("Mouse up");
        this.game.entities.forEach(entity => {
            if (entity.hoverable)
            {
                entity.mouseUp(mouseX, mouseY);
            }
        });
    }

}