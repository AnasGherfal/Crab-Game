class Background {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });
        //this.spritesheet = ASSET_MANAGER.getAsset("./background.png");

    };

    update() {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    };
};

class Tree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("")
    }

    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    }

};

class Sun {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.spritesheet = ASSET_MANAGER.getAsset("images/sun.png");
    }
    update() {

    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 50, 50, 80, 30, ths.x, ths.y);
    }

}