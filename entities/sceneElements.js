// class Background extends Entity {
//     constructor(game, images) {
//         super(game, 0, 0);
//     }
// }

class Scene extends Entity {

    constructor(game) {
        super(game, 0, 0);
        this.game.camera = this;
        this.x = 0;

        this.title = true;

        this.menuSelect = {
            newGame: false,
            credits: false
        }

        //UI Panels
        // this.game.addEntity(new ProgressBar(game, 100, 200, 400, 30, rgb(160,38,37)));
        this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
        this.game.addEntity(this.playerHealthBar);

        //Player
        this.player = new Player(game, 400, 600);
        this.game.addEntity(this.player);

        //Entity Counter
        this.entityCounter = new TextElement(game, 50, 200, "Entities: " + game.entities.length);
        this.game.addEntity(this.entityCounter);

        //Test Dummy
        this.testDummy = new Dummy(game, 850, 700);
        this.game.addEntity(this.testDummy);

        // this.loadLevel(400, 300);

        this.teleporter = new Teleporter(game, 600, 710);
        this.game.addEntity(this.teleporter);

    };

    clearEntities() {
        this.game.entites.forEach(function(entity) {
            entity.removeFromWorld = true;
        });
    };

    enemyWave() {

        //generate 5 zombies
        // for (var i = 0; i < 5; i++) {
        //     this.zombie = new Zombie(this.game, i * 200, 700);
        //     this.game.addEntity(this.zombie);
        // }
    }

    loadLevel(level, x, y, title) {
        this.game.entites = [];
        this.clearEntities();
        this.x = 0;
        this.level = level;
        this.title = title;

        //todo: spawn new wave after a set time?

        this.enemyWave();

        //todo : figure out max level length
        // spawn trees based on level length
        // spawn clouds based on level length

        var platNum = Math.round(Math.random() * 20);

        for (var i = 0; i < 20; i++) {
            //coin flip to make it more random idk

            if (Math.round(Math.random()) / 2 == 0) {
                var j = Math.round(Math.random() * 100);
                this.background = new Platform(this.game, i * 300, j + 600, 300, 10);
                this.game.addEntity(this.background);
            }
        }
        for (var i = 0; i < 100; i++) {
            this.background = new Ground(this.game, i * 48, 750);
            this.game.addEntity(this.background);
        }

        for (var i = 0; i < 50; i++) {
            this.background = new PixalTree(this.game, i * 1200, 630);
            this.game.addEntity(this.background);
        }
        for (var i = 0.01; i < 20; i++) {
            this.background = new Mashroom(this.game, i * 1200, 737);
            this.game.addEntity(this.background);
        }

        for (var i = 0; i < 50; i++) {
            this.background = new Tree(this.game, -80 + i * 100, 250);
            this.game.addEntity(this.background);
        }

        for (var i = 0; i < 20; i++) {
            this.background = new Clouds(this.game, i * 1236, 50);
            this.game.addEntity(this.background);
        }



        this.background = new Sun(this.game, 900, 90);
        this.game.addEntity(this.background);

        for (var i = 0; i < 20; i++) {
            this.background = new Mountain(this.game, i * 1236, 158);
            this.game.addEntity(this.background);
        }
        for (var i = 0; i < 20; i++) {
            this.background = new Sky(this.game, i * 1236, 50);
            this.game.addEntity(this.background);
        }




        // if (music && !this.title) {
        //     ASSET_MANAGER.pauseBackgroundMusic();
        //     ASSET_MANAGER.playAsset(music);
        // }


        //this.player.x = x;
        //this.player.y = y;

        //var that = this;
        //var player = false;
        //this.game.entites.forEach(function(entity) {
        //    if(that.player === entity) player = true;
        //});

        //if(!player) this.game.addEntity(this.player);

    };

    updateAudio() {
        var mute = document.getElementById("mute").checked;
        var volume = document.getElementById("volume").value;

        ASSET_MANAGER.muteAudio(mute);
        ASSET_MANAGER.adjustVolume(volume);

    };

    addEntity(entity) {
        this.game.addEntity(entity);
    }

    getHit(shootingVector)
    {
        let hitEntities = []
        this.game.entities.forEach(entity => {
            if (entity.shootable)
            {
                if (shootingVector.intersect(entity.hitVector))
                {
                    hitEntities.push(entity);
                }
            }
        });
        return hitEntities;
    }

    update() {
        //camera follow forward movement
        let camF = this.game.width * 3 / 4;
        if (this.x < this.player.x - camF) this.x = this.player.x - camF;
        //camera follow backwards movement
        let camB = this.game.width * 1 / 8;
        if (this.x > this.player.x - camB) this.x = this.player.x - camB;


        let c = 0;
        this.game.entities.forEach(entity => {
            c += 1;
        });
        this.entityCounter.text = "Entities: " + c;

        // Shoot Detection
        this.player.hitVector.color = rgba(0, 0, 0, 1);
        this.game.entities.forEach(entity => {
            if (entity.shootable)
            {
                if (this.player.hitVector.intersect(entity.hitVector))
                {
                    this.player.hitVector.color = rgba(255, 0, 0, 1);
                }
            }
        });

        // if (this.lineOne.intersect(this.player.hitVector))
        // {
        //     this.player.hitVector.color = rgba(255, 0, 0, 1);
        // }
        // else
        // {
        //     this.player.hitVector.color = rgba(0, 0, 0, 1);
        // }


    };

}
