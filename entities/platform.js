class Platform extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        
        
    }
    update() {


    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(800 - this.game.camera.x, 600, this.width, this.height);
        // this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);

    }
}