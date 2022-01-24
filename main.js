const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("images/riskPlayer.png");
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

	// gameEngine.addEntity(new Thing(gameEngine));
	
	// gameEngine.addEntity(new BitSpawner(gameEngine, 300, 300));
	// gameEngine.addEntity(new RainbowBox(gameEngine, 200, 200, 100, 100));
	
	// gameEngine.addEntity(new ImageEntity(gameEngine, ASSET_MANAGER.getAsset("images/babes.jpeg"), 400, 200, 300, 200));

	// gameEngine.addEntity(new ProgressBar(gameEngine, 200, 200, 300, 50));
	// gameEngine.addEntity(new TextElement(gameEngine, 200, 150, "This is a test"));

	// gameEngine.addEntity(new StatTracker(gameEngine, 300, 8, 200, 40));

	gameEngine.addEntity(new Panel(gameEngine, 0 , 0, canvas.width, 60, "rgba(52, 73, 94,1.0)"));

	// gameEngine.addEntity(new RoundedRectangle(gameEngine, 100, 100, 200, 150));

	// gameEngine.addEntity(new Button(gameEngine, 10, 710, 200, 50, rgba(26, 188, 156, 1.0), rgba(22, 160, 133,1.0)));

	// gameEngine.addEntity(new RoundedRectangle(gameEngine, 200, 200, 400, 10, "#000"));

	gameEngine.addEntity(new Scene(gameEngine));

	gameEngine.init(ctx);

	gameEngine.start();
});

gameEngine.addEntity(new Tracker(gameEngine, 50, 50));
