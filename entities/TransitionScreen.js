class TransitionScreen {
    constructor(game, x, y, gameOver) {
        Object.assign(this, { game , x, y, gameOver });
        this.elapsedTime = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.elapsedTime > 2) {

            this.game.camera.loadLevel(this.x, this.y, false, this.gameOver);
        }
    };
    draw(ctx) {
        if (this.gameOver) {
            ctx.fillText("GAME OVER", 600, 384);
            this.game.camera.loadLevel(400, 300, false, true);

        }
        
    }
};

