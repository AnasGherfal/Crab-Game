class TransitionScreen {
    constructor(game, level, x, y, gameOver) {
        Object.assign(this, { game, level, x, y, gameOver });
        this.elapsedTime = 0;
    };

    // update() {
    //     this.elapsedTime += this.game.clockTick;

    //     if (this.elapsedTime > 2) {

    //         this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver);
    //     }
    // };
    draw(ctx) {
        if (this.gameOver) {
            ctx.fillText("GAME OVER", 600, 384);
            //this.game.camera.loadLevel(400, 300, false, true);

        }
        
    }
};

