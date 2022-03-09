class Item extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        //Properties
        this.activatable = true;
        this.floatPercent = 0

        this.spritesheet = ASSET_MANAGER.getAsset("images/mashroom.png");

        //this.tempSprite = new Rectangle(this.game, x, y - 20, 10, 10, rgba(300, 50, 50, 1));
        //this.children.push(this.tempSprite);
        
        this.plusl = new Rectangle(this.game, x+10, y, 10, 30, rgba(300, 50, 50, 1));
        this.children.push(this.plusl);
        this.plush = new Rectangle(this.game, x, y+10, 30, 10, rgba(300, 50, 50, 1));
        this.children.push(this.plush);
        

        this.text = new TextElement(game, x - 30, y - 40, "Health [E]");
        //this.text.textAlign = "center";
        this.text.sceneElement = true;
        this.children.push(this.text);
    }

    activate() {
        let player = this.game.sceneManager.player;

        if (Math.abs(player.x - this.x) < 50 && Math.abs(player.y - this.y) < 50) {
            this.activatable = false;
            this.setInvisible(true);
            player.changeHealth(0.1);
        }
    }

    update() {
        if (this.floatPercent >= 1.0) {
            this.floatPercent = 0.0;
        } else {
            this.floatPercent += 0.005
        }
    }

    draw(ctx) {
        let d = 5 * Math.sin(2 * Math.PI * this.floatPercent);
        this.moveBy(0, d);
        super.draw(ctx);
        this.moveBy(0, -d);

    }

}