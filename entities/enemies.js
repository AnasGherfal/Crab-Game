class Zombie extends Entity {

    constructor(game, x, y) {

        super(game, x, y);

        //this.BB = new BoundingBox(this.x, this.y, width, height);

        this.width = 6;
        this.height = 145;
        this.scale = 0.4;

        this.direction = 0;

        // this.clickable = true;
        // this.hoverable = true;
       // if (title == false){
        this.animator = new Animator(ASSET_MANAGER.getAsset("images/zombie.png"), 154, 717, 89, 130, 6, 0.5);
       // }

        //this.updateBB();
    }

    displayDamageText(text) {
        this.children.push(new DamageIndicator(this.game, this.x, this.y, text, 100));
    }
    // updateBB(){
    //     this.lastBB = this.BB;
    //         this.BB = new BoundingBox(this.x, this.y, width, height);
    // };

    update() {


        // super.update();
        this.vx = 0.2;




        // if (this.jumpCooldown > 0) {
        //     this.jumpCooldown -= 1;
        // }

        let dampenHorizontal = true;

        if (this.y < this.game.height - this.height * this.scale) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }
        this.x += this.vx;
        this.y += this.vy;

        // collison
        // var that = this;
        // this.game.entites.forEach(function(entity){
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //         if (entity instanceof Player) {
        //         } else if ((entity instanceof Tree || entity instanceof Sun || entity instanceof Clouds || entity instanceof sky || entity instanceof Mountain || entity instanceof Ground)
        //         && (that.BB.bottom - that.vy * that.game.clockTick * PARAMS.SCALE) <= entity.BB.top) {
        // }


    }

    draw(ctx) {
        
        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, this.direction);
        ctx.strokeStyle = "Red";
        ctx.strokeRect(this.x,this.y, 36, 55);
        ctx.save();
        ctx.scale(-1, 1)
        ctx.restore();

    }

}