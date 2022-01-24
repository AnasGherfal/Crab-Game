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

        this.children.push(this.player);

        

    }
}
