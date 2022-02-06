class Background {
    constructor(game, x, y, spritesheet) {
        Object.assign(this, { game, x, y });
        //this.spritesheet = ASSET_MANAGER.getAsset("./background.png");

    };

    update() {};

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 0, 0);
    }
}

class Tree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 90;
        this.height = 90;


        this.spritesheet = ASSET_MANAGER.getAsset("images/tree.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);

        // ctx.fillRect(this.x, this.y, this.width, this.height)

    };

};

class Sun {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 90;
        this.height = 90;

        this.spritesheet = ASSET_MANAGER.getAsset("images/sun.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    };

};

class Clouds {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 90;
        this.height = 90;

        this.spritesheet = ASSET_MANAGER.getAsset("images/cloud.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    };

};