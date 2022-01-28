class Background extends Entity
{
    constructor(game, images)
    {
        super(game, 0, 0);
    }
}

class Scene extends Entity
{
    constructor(game)
    {
        super(game, 0, 0);

        //Player
        this.player = new Player(game, 200, 300);
        this.game.addEntity(this.player);

        //Test Button
        this.testButton = new Button(game, 10, 710, 200, 50, rgba(26, 188, 156, 1.0), rgba(22, 160, 133,1.0));
        this.testButton.onMouseClicked = function() {
            this.game.addEntity(new DamageIndicator(game, 200, 300, "HIT!", 100));
        };
        this.game.addEntity(this.testButton);

        this.entityTracker = new EntityTracker(game, 10, 600, this.player);
        this.addEntity(this.entityTracker);

    }

    addEntity(entity)
    {
        this.game.addEntity(entity);
    }

}
