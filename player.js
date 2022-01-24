class Player {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });
        
        this.state = 0;
        
        this.loadAnimations(spritesheet);
        
    };

    loadAnimations(spritesheet) {
        //idle = 0, move = 1
        this.playAnim = [];
        
        this.playAnim[0] = new Animator(spritesheet, sX, sY, sW, sH, fC, fD, fP, false, true);
        
    };

    update() {
        //update velocity 
        //update position
        
    };
        
    draw(ctx) {
        
        
        this.playAnim[this.state].drawFrame(this.game.clockTick, this.game.ctx, this.x, this.y);
        
    };
};
