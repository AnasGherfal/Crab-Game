class TransitionScreen {
    constructor(game, x, y, gameOver) {
        Object.assign(this, { game, x, y, gameOver });
        this.elapsed = 0;
    };

    update() {
        this.elapsedTime += this.game.clockTick;

        if (this.elapsedTime > 2) 
            this.game.camera.loadLevel(this.x, this.y, false, this.gameOver);
    };

    draw(ctx) {
        ctx.fillStyle = "Red";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.font = 50  + "px " + "robotoCondensed"
        ctx.fillStyle = "White";
        ctx.fillStyle = "White";
        ctx.fillText("GOLD#3", 200, 400);

        if (this.gameOver) {
            ctx.fillText("GAME OVER", 200, 400);
        }else{
            ctx.drawImage(this.game.player.animator, 400, 600);
        }
    }
};

