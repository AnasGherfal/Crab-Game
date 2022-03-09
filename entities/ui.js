class UIElement extends Entity
{
    constructor(game, x, y, clickable = false)
    {
        super(game, x, y);
        this.sceneElement = true;
    }

}

class TextElement extends UIElement
{
    constructor(game, x, y, text, fontFamily = "robotoCondensed", fontSize = 24, color = "#000", textAlign = "left")
    {
        super(game, x, y)

        this.text = text;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.color = color;
        this.textAlign = textAlign;
        this.maxWidth = 0;

        this.sceneElement = false;
    }

    draw(ctx)
    {
        ctx.save();

        if (this.invisible)
        {
            return;
        }

        ctx.font = (this.fontSize) + "px " + (this.fontFamily); 

        ctx.fillStyle = this.color;
        

        ctx.textAlign = this.textAlign;
        if (this.textAlign == "center")
        {
            ctx.textBaseline = "middle";
        }

        if (this.maxWidth == 0)
        {
            ctx.fillText(this.text, this.x - (this.sceneElement ? this.game.camera.x : 0), this.y);
        }
        else
        {
            ctx.fillText(this.text, this.x - (this.sceneElement ? this.game.camera.x : 0), this.y, this.maxWidth);   
        }
        ctx.restore();
    }
}

class DamageIndicator extends TextElement
{
    constructor(game, x, y, text, fadeTime)
    {
        super(game, x, y, text);

        this.fadeTime = fadeTime;
        this.currentTick = 0;
        this.opacityPercent = 1.0;

        //Choose random angle to rotate text
        this.rotationAngle = (randomInt(20)-10) * (Math.PI / (180));
    }

    update()
    {
        //Floating Effect
        this.y -= 1;

        this.currentTick++;
        this.opacityPercent = 1 - (this.currentTick / this.fadeTime);
        this.color = "rgba(0,0,0, " + this.opacityPercent + ")"
        if (this.currentTick >= this.fadeTime)
        {
            console.log("Removing from world");
            this.removeFromWorld = true;
        }
    }

    draw(ctx)
    {
        ctx.save();

        ctx.font = (this.fontSize) + "px " + (this.fontFamily); 
        ctx.fillStyle = this.color;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationAngle);
        ctx.fillText(this.text, 0, 0);
        

        ctx.restore();
    }

    moveBy(x, y)
    {

    }

}

class Panel extends UIElement
{
    constructor(game, x, y, width, height, panelColor)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.panelFront = new Rectangle(game, x, y, width, height - 6, rgb(178,182,157));
        this.panelBack = new Rectangle(game, x, y, width, height, "#898e6b");

        this.children.push(this.panelBack);
        this.children.push(this.panelFront);

        // this.children.push(new Rectangle(game, x, y, width, height, panelColor));
    }

}

class EntityTracker extends Panel
{
    constructor(game, x, y, entityToTrack)
    {
        super(game, x, y, 200, 100, rgba(50, 50, 50, 1));

        this.trackedEntity = entityToTrack;

        this.entityPosition = new TextElement(game, x + 5, y + 25, "pos : " + this.trackedEntity.getFormattedPosition());
        this.entityPosition.maxWidth = 200 - 5;
        this.entityPosition.sceneElement = false;
        this.children.push(this.entityPosition);

        this.entityVelocity = new TextElement(game, x + 5, y + 55, "vel : " + this.trackedEntity.getFormattedPosition());
        this.entityVelocity.maxWidth = 200 - 5;
        this.entityVelocity.sceneElement = false;
        this.children.push(this.entityVelocity);
    }

    update()
    {
        this.entityPosition.text = "pos : " + this.trackedEntity.getFormattedPosition();
        this.entityVelocity.text = "vel : " + this.trackedEntity.getFormattedVelocity();
    }


}

class Button extends UIElement
{
    constructor(game, x, y, width, height, frontColor, backColor, textColor = "#fff", text = "")
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.clickable = true;
        this.hoverable = true;

        this.frontColor = frontColor;
        this.backColor = backColor;

        this.buttonBack = new RoundedRectangle(game, x, y, width, height, backColor);
        this.buttonFront = new RoundedRectangle(game, x, y, width, height - 6, frontColor);
        this.text = new TextElement(game, (x + width / 2), (y + height / 2), "Explode!", "robotoCondensed", height / 2, textColor, "center");

        this.buttonBack.sceneElement = false;
        this.buttonFront.sceneElement = false;
        this.text.sceneElement = false;

        this.children.push(this.buttonBack);
        this.children.push(this.buttonFront);
        this.children.push(this.text);
    }

    mouseClicked(mouseX, mouseY)
    {
        // console.log(mouseX + ", " + mouseY);
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = this.backColor;
            this.onMouseClicked();
        }
    }

    onMouseClicked()
    {
        
    }

    mouseUp(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            this.buttonFront.color = this.frontColor;
        }
    }

    mouseHover(mouseX, mouseY)
    {
        if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height)
        {
            document.documentElement.style.cursor = "pointer";
        }
        else
        {
            this.buttonFront.color = this.frontColor;
            document.documentElement.style.cursor = "";
        }
    }

}

class StatTracker extends UIElement
{
    constructor(game, x, y, width, height)
    {
        super(game, x, y);

        this.width = width;
        this.height = height;

        this.trackerBack = new RoundedRectangle(game, x, y, width, height, rgba(0, 0, 0, 0.5));
        this.text = new TextElement(game, (x + width / 2) + (height / 2), (y + height / 2), "100k", "robotoCondensed", height / 2, "#fff", "center");
        this.heartIcon = new ImageEntity(game, x, y, ASSET_MANAGER.getAsset("images/iconHeart.png"), height, height);

        this.trackerBack.sceneElement = false;
        this.text.sceneElement = false;
        this.heartIcon.sceneElement = false;

        this.children.push(this.trackerBack);
        this.children.push(this.text);
        this.children.push(this.heartIcon);

        this.tick = 0;
        this.currentNumber = 0;

    }

    update()
    {
        this.tick += 1;
        if (this.tick >= 10)
        {
            this.text.text = this.currentNumber += 1;
            this.tick = 0;
        }
    }

}

class ProgressBar extends UIElement
{
    constructor(game, x, y, width, height, color = rgb(160,38,37), isSceneElement = false)
    {
        super(game, x, y, false);

        this.width = width;
        this.height = height;
        this.color = color;

        this.currentPercent = 0.5;

        this.progressBarBack = new Rectangle(game, x, y, this.width, this.height, "rgba(0, 0, 0, 0.4)");
        this.progressBarFront = new Rectangle(game, x, y, this.width * this.currentPercent, this.height, this.color);

        let whiteBarPercent = 0.08;
        this.progressBarBottom = new Rectangle(game, x, y + height - this.height * whiteBarPercent, this.width, this.height * whiteBarPercent, rgba(255,255,255, 1));

        this.progressBarBack.sceneElement = isSceneElement;
        this.progressBarFront.sceneElement = isSceneElement;
        this.progressBarBottom.sceneElement = isSceneElement;

        this.children.push(this.progressBarBack);
        this.children.push(this.progressBarFront);
        this.children.push(this.progressBarBottom);
    }

    setPercent(percent)
    {
        if (percent < 0) this.currentPercent = 0.0
        else if (percent > 1) this.currentPercent = 1.0
        else this.currentPercent = percent;

        this.progressBarFront.width = this.width * this.currentPercent;
    }

    incrementPercent(percentToIncrement)
    {
        this.setPercent(this.currentPercent += percentToIncrement);
    }
}

class PlayerHealthBar extends UIElement
{
    constructor(game, x, y, scale)
    {
        super(game, x, y);

        this.icon = new Rectangle(game, x, y, 50, 50, rgb(255, 255, 255));
        this.progressBarHealth = new ProgressBar(game, x + 55, y + 20, 400, 30, rgb(160,38,37));
        this.progressBarText = new TextElement(game, x + 55, y + 18, "Health");
        
        this.icon.sceneElement = false;
        this.progressBarHealth.sceneElement = false;
        this.progressBarText.sceneElement = false;

        this.children.push(this.icon);
        this.children.push(this.progressBarHealth);
        this.children.push(this.progressBarText);
    }

    update()
    {
        let currentHealth = this.game.sceneManager.player.currentHealth;
        this.setPercent(currentHealth);
    }

    setPercent(percent)
    {
        this.progressBarHealth.setPercent(percent);
    }

    incrementPercent(percentToIncrement)
    {
        this.progressBarHealth(percentToIncrement);
    }

}
