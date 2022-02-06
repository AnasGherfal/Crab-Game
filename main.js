const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("images/riskPlayer.png");
ASSET_MANAGER.queueDownload("images/zombie.png");
ASSET_MANAGER.queueDownload("images/sky.png");
ASSET_MANAGER.queueDownload("images/clouds.png");
ASSET_MANAGER.queueDownload("images/tree.png");
ASSET_MANAGER.queueDownload("images/sun.png");
ASSET_MANAGER.queueDownload("images/iconHeart.png");

ASSET_MANAGER.downloadAll(() => {
    const canvas = document.getElementById("gameWorld");
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    //Load Fonts
    var robotCondensed = new FontFace("robotoCondensed", "url(fonts/RobotoCondensed-Regular.ttf)");
    robotCondensed.load().then(function(font) {
        document.fonts.add(robotCondensed);
        console.log("Font Loaded");
    });

    // gameEngine.addEntity(new StatTracker(gameEngine, 300, 8, 200, 40));
    gameEngine.addEntity(new Panel(gameEngine, 0, 0, canvas.width, 60, "rgba(52, 73, 94,1.0)"));
    gameEngine.addEntity(new Scene(gameEngine));

    gameEngine.init(ctx);

    gameEngine.start();
});

gameEngine.addEntity(new Tracker(gameEngine, 50, 50));