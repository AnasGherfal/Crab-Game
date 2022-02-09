class Platform extends Entity {
    constructor(game, x, y, width, height) {
        super(game, x, y);
        this.width = width;
        this.height = height;

        this.collisions = true;
        
        this.platformRect = new Rectangle(this.game, this.x - this.game.camera.x, this.y, this.width, this.height);
        this.children.push(this.platformRect);
        
    }

    update() {
        this.platformRect.x = this.x - this.game.camera.x;
    }

}