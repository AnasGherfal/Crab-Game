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

        //UI Panels
        // this.game.addEntity(new ProgressBar(game, 100, 200, 400, 30, rgb(160,38,37)));
        this.playerHealthBar = new PlayerHealthBar(game, 10, 10, 1);
        this.game.addEntity(this.playerHealthBar);

        //Player
        this.player = new Player(game, 400, 300);
        this.game.addEntity(this.player);

        //Entity Counter
        this.entityCounter = new TextElement(game, 50, 200, "Entities: " + game.entities.length);
        this.game.addEntity(this.entityCounter);

        //Test Dummy
        this.testDummy = new Dummy(game, 850, 700);
        this.game.addEntity(this.testDummy);

        //Test Button
        // this.testButton = new Button(game, 10, 710, 200, 50, rgba(26, 188, 156, 1.0), rgba(22, 160, 133, 1.0));
        // this.testButton.onMouseClicked = function() {
        //     // this.game.addEntity(new DamageIndicator(game, 200, 300, "HIT!", 100));
        // };
        // this.game.addEntity(this.testButton);

        // this.addEntity(new Circle(game, 200, 200, rgba(100, 0, 100, 1), 3));
        this.addEntity(new FloatingBalls(game, 1024/2, 800/2));

    }

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
        //1024 = canvas width
        //camera follow forward movement
        let camF = 1024 * 3 / 4;
        if (this.x < this.player.x - camF) this.x = this.player.x - camF;
        //camera follow backwards movement
        let camB = 1024 * 1 / 8;
        if (this.x > this.player.x - camB) this.x = this.player.x - camB;


        let c = 0;
        this.game.entities.forEach(entity => {
            c += entity.getChildrenCount() + 1;
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

        //platform collistion detection
        /*
         if (this.player.vy + this.player.height <= this.platform.y && this.player.y +
             this.player.height + this.player.vy >= this.platform.y && this.player.x +
             this.player.width >= this.platform.x) {
             this.player.vy = 0
         } */

    }

}