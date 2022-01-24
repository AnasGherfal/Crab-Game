class Tracker {
    constructor(game, x, y) {
        // Object.assign(this, {game, x, y, vx: 0, vy: 0, removeFromWorld: false})
        this.game = game;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.removeFromWorld = false;
        this.tick = 0;

        this.lastMousePos = this.game.mouse;
    };

    draw(ctx, engine) {
        ctx.beginPath();
        
        ctx.fillStyle = rgba(236, 240, 241,1.0);
        ctx.font = "24px robotoCondensed";
        ctx.fillText("(" + (this.game.mouse != null ? this.game.mouse.x : -1) + ", " + (this.game.mouse != null ? this.game.mouse.y : -1) + ")", 10, 35); //Mouse doesn't init until movement detected
    };

    update() {
        this.tick += 1;
        if (this.tick >= 500) 
        {
            // this.removeFromWorld = true;
        }
    };

}