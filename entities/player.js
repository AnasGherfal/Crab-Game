class Player extends Entity {
    constructor(game, x, y) {
        super(game, x, y);

        //Sizing
        this.width = 6;
        this.height = 11;
        this.scale = 5;

        //Right = 0
        //Left  = 1
        this.direction = 0;

        //Flags
        this.clickable = true;
        this.hoverable = true;

        //Sprite
        this.animator = new Animator(ASSET_MANAGER.getAsset("images/riskPlayer.png"), 0, 0, 6, 11, 8, 0.2);

        //Properties
        this.jumpCooldown = 100;

        //Attached Objects
        this.hitVector = new Vector(game, x, y, x, y);
        this.children.push(this.hitVector);

        this.muzzleFlash = new ParticleSpawner(game, x, y, [rgba(255, 200, 0, 1)]);
        this.children.push(this.muzzleFlash);

        //Debug Options
        this.hitVector.invisible = false;
    }

    mouseClicked(mouseX, mouseY) {
        // this.displayDamageText(randomInt(10) + 1);
        this.muzzleFlash.spawnParticles(1, 0, -1);
        this.setHitVector();
        this.game.sceneManager.getHit(this.hitVector).forEach(entity => {
            let damage = -getRandomInteger(1, 10);
            entity.displayDamageText(damage); //Deal damage
            entity.changeHealth(damage);
        });

        //Debug Stuff
        //console.log(this.direction == 1 ? "RIGHT" : "LEFT");
    }

    displayDamageText(text) {
        
        let sX = this.game.sceneManager.x;
        let sY = this.game.sceneManager.y;

        this.children.push(new DamageIndicator(this.game, this.x - sX, this.y - sY, text, 100));
    }

    setHitVector()
    {
        let sX = this.game.sceneManager.x;
        let sY = this.game.sceneManager.y;

        var mouse = this.game.mouse;

        if (mouse != null)
        {
            let x1 = this.x + (this.width * this.scale / 2);
            let y1 = this.y + (this.height * this.scale / 2);

            let x2 = mouse.x + sX;
            let y2 = mouse.y;

            this.direction = x1 > x2 ? 0 : 1;

            let m = (y2 - y1) / (x2 - x1);

            let reach = 50;

            //Get x2 distance (with direction) and extend by reach
            x2 = (x2 - x1) * reach + x1;
            y2 = m * (x2 - x1) + y1;

            this.hitVector.x = x1;
            this.hitVector.y = y1;
            this.hitVector.x2 = x2;
            this.hitVector.y2 = y2;
        }
    }

    update() {
        super.update();

        this.setHitVector();

        if (this.jumpCooldown > 0) {
            this.jumpCooldown -= 1;
        }

        let dampenHorizontal = true;

        this.vx *= 0.94;


        // COLLISION DETECTION
        for (let i = 0; i < this.game.entities.length; i++)
        {
            if (this.game.entities[i].collisions)
            {
                let t = this.game.entities[i];
                if (this.x > t.x && this.x < t.x + t.width)
                {
                    if (this.y < t.y - this.height * this.scale)
                    {
                        t.platformRect.color = rgba(255, 100, 100, 1);
                    }
                    
                }
                else
                {
                    t.platformRect.color = rgba(0, 100, 100, 1);
                }
            }
        }

        if (this.y < this.game.height - this.height * this.scale) {
            this.vy += 0.25;
        } else {
            this.vy = 0;
        }

        if (this.game.keys != undefined) {
            if (this.game.keys["w"] && this.jumpCooldown == 0) {
                this.vy -= 10;
                this.jumpCooldown = 100;
                // this.particleSpawner.trigger();
            }

            if (this.game.keys["a"] ) { 
                this.vx = -2;
                dampenHorizontal = false;
            } else
                this.vs = 0;

            if (this.game.keys["d"] ) { 
                if (dampenHorizontal) {
                    this.vx = 2;
                } else {
                    this.vx = 0;
                }
                dampenHorizontal = false;
            }

        }

        if (this.vx > 10) {
            this.vx = 10;
        }
        if (this.vx < -10) {
            this.vx = -10;
        }

        if (this.vy > 10) {
            this.vy = 10;
        }
        if (this.vy < -10) {
            this.vy = -10;
        }

        // this.x += this.vx;
        // this.y += this.vy;

        this.moveBy(this.vx, this.vy);

        if (abs(this.vx) < 0.0001) {
            this.vx = 0;
        }


    }

    draw(ctx) {
        
        ctx.save();
        // if (this.direction == 1) {
        //     ctx.scale(-1, 1);
        // }

        //Draw Aim Line
        ctx.beginPath();
        ctx.moveTo(this.x + (this.scale * this.width / 2), this.y + (this.scale * this.height / 2));

        super.draw(ctx);
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y, this.scale, 0);

        ctx.restore();

    }
}