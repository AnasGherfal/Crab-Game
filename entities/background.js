class Background {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });
        //this.spritesheet = ASSET_MANAGER.getAsset("./background.png");
        
    };
    
    update(){};
    
    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
};
