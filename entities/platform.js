class Platform extends Entity {
    constructor(game, x, y) {
        super(game, x, y);
        // this.positon = {
        //     x: 300,
        //     y: 600
        // }
        this.width = 100;
        this.height = 20;
    }
    update() {


    }

    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
            // this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);

    }
}