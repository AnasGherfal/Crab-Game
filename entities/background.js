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
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/tree.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.3, this.y, this.width, this.height);

        // ctx.fillRect(this.x, this.y, this.width, this.height)

    };

};
// class Tree2 {
//     constructor(game, x, y) {
//         Object.assign(this, { game, x, y });

//         this.width = 100;
//         this.height = 230;


//         this.spritesheet = ASSET_MANAGER.getAsset("images/tree2.png");
//     };

//     update() {

//     };

//     draw(ctx) {
//         ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);


//     };

// };

class Tree3 {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/bigTree.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.7, this.y, this.width, this.height);


    };

};

class Grass {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/backGrass.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);


    };

};
class PixalTree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 120;
        this.height = 170;


        this.spritesheet = ASSET_MANAGER.getAsset("images/pixalTree.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 1.3, this.y, this.width, this.height);

        // ctx.fillRect(this.x, this.y, this.width, this.height)

    };

};

class River {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/river.png");
    };

    update() {


    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 1.5, this.y, this.width, this.height);


    };

};

class Rock {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/rock.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 1.2, this.y, this.width, this.height);


    };

};

class Grass2 {
    constructor(game, x, y, width, height) {
        Object.assign(this, { game, x, y });

        this.width = width;
        this.height = height;


        this.spritesheet = ASSET_MANAGER.getAsset("images/grass.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.2, this.y, this.width, this.height);


    };

};



class Sun {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 50;
        this.height = 50;

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
        this.height = 170;

        this.spritesheet = ASSET_MANAGER.getAsset("images/clouds.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.5, this.y, this.width, this.height);

    };

};

class Sky {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 1240;
        this.height = 450;

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

        this.width = 1240;
        this.height = 250;

        this.spritesheet = ASSET_MANAGER.getAsset("images/mountain.png");
    };
    update() {


    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.1, this.y, this.width, this.height);
    };

};

class Ground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 50;
        this.height = 50;

        this.spritesheet = ASSET_MANAGER.getAsset("images/ground.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };
}

class Palm {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 200;
        this.height = 350;



        this.spritesheet = ASSET_MANAGER.getAsset("images/palm.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 0.4, this.y, this.width, this.height);
    };

};

class mashroomTree {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 250;
        this.height = 250;



        this.spritesheet = ASSET_MANAGER.getAsset("images/mushroomTree.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x * 1.1, this.y, this.width, this.height);
    };

};

class Mashroom {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 20;
        this.height = 20;



        this.spritesheet = ASSET_MANAGER.getAsset("images/mashroom.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };

};

class Bush {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.width = 150;
        this.height = 150;

        this.spritesheet = ASSET_MANAGER.getAsset("images/bush.png");
    };
    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
    };

};

// class BackColor {
//     constructor(game, x, y) {
//         Object.assign(this, { game, x, y });

//         this.width = 500;
//         this.height = 500;

//         this.spritesheet = ASSET_MANAGER.getAsset("images/green-background-images.jpg");
//     };
//     update() {

//     };

//     draw(ctx) {
//         ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y, this.width, this.height);
//     };

// };
