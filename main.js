const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

//spritesheets

ASSET_MANAGER.queueDownload("images/sun.png");
ASSET_MANAGER.queueDownload("images/sky.png");
ASSET_MANAGER.queueDownload("images/clouds.png");

ASSET_MANAGER.queueDownload("images/tree.png");
ASSET_MANAGER.queueDownload("images/bigTree.png");
ASSET_MANAGER.queueDownload("images/palm.png");
ASSET_MANAGER.queueDownload("images/mushroomTree.png");

ASSET_MANAGER.queueDownload("images/backGrass.png");
ASSET_MANAGER.queueDownload("images/river.png");



ASSET_MANAGER.queueDownload("images/pixalTree.png");
ASSET_MANAGER.queueDownload("images/mashroom.png");
ASSET_MANAGER.queueDownload("images/bush.png");
ASSET_MANAGER.queueDownload("images/rock.png");
ASSET_MANAGER.queueDownload("images/grass.png");

ASSET_MANAGER.queueDownload("images/crabwalk.png");
ASSET_MANAGER.queueDownload("images/crabidle.png");
ASSET_MANAGER.queueDownload("images/crabgun.png");
//ASSET_MANAGER.queueDownload("images/riskPlayer.png");
ASSET_MANAGER.queueDownload("images/zombie.png");
ASSET_MANAGER.queueDownload("images/zombieFlipped.png");

ASSET_MANAGER.queueDownload("images/bird.png");


ASSET_MANAGER.queueDownload("images/iconHeart.png");
ASSET_MANAGER.queueDownload("images/background.png");
ASSET_MANAGER.queueDownload("images/mountain.png");
ASSET_MANAGER.queueDownload("images/ground.png");
ASSET_MANAGER.queueDownload("images/green-background-images.jpg");




//music 
ASSET_MANAGER.queueDownload("music/test.mp3");



ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    ASSET_MANAGER.autoRepeat("music/test.mp3");

    ctx.imageSmoothingEnabled = false;

    //Load Fonts
    var robotCondensed = new FontFace("robotoCondensed", "url(fonts/RobotoCondensed-Regular.ttf)");
    robotCondensed.load().then(function(font) {
        document.fonts.add(robotCondensed);
        console.log("Font Loaded");
    });

    sceneManager = new Scene(gameEngine);
    gameEngine.addEntity(sceneManager);
    gameEngine.sceneManager = sceneManager;

    gameEngine.init(ctx);

    gameEngine.start();
});