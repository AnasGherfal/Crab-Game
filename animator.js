class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration});
        this.elapsedTime = 0;
        this.totaTime = frameCount * frameDuration;
    };

    drawFrame(tick, ctx, x, y, scale = 1, direction = 0) {

        this.elapsedTime += tick;
        
        const frame = this.currentFrame() % this.frameCount;
        
        // ctx.drawImage(this.spritesheet, 100, 100, 84, 113);

        ctx.drawImage(this.spritesheet, 
            this.xStart + frame * this.width, this.yStart + direction * this.height, 
            this.width, this.height, 
            x, y, 
            this.width * scale, this.height * scale); //s = start, d = destination

        
    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}