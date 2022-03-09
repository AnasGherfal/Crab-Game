class Platform extends Entity {
    constructor(game, x, y, width, height) {
        super(game, x, y);
        this.width = width;
        this.height = height;

        this.collisions = true;

        this.spritesheet = ASSET_MANAGER.getAsset("images/ground.png");


        this.platformRect = new Rectangle(this.game, this.x - this.game.camera.x, this.y, this.width, this.height);
        this.children.push(this.platformRect);

    }
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };

}