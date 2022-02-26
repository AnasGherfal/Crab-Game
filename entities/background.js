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

        this.width = 250;
        this.height = 300;


        this.spritesheet = ASSET_MANAGER.getAsset("images/tree.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);

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

        this.width = 1240;
        this.height = 150;

        this.spritesheet = ASSET_MANAGER.getAsset("images/clouds.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };

};

class Sky {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 1240;
        this.height = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("images/sky.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    };

};

class Mountain {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 1200;
        this.height = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("images/mountain.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };

};

class Ground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 50;
        this.height = 50;

        this.spritesheet = ASSET_MANAGER.getAsset("images/grass.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };
};

class Water{
    constructor(game, x, y){
        Object.assign(this, {game, x, y});

        this.width = 500;
        this.height = 200;

        this.spritesheet = ASSET_MANAGER.getAsset("images/long.png");

    };

    update(){

    };
    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };
}


