class classCollision
{
    constructor(x, y, width, height, imgSrc)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image;
        this.img.src = imgSrc
    }

    Start()
    {
    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    DrawAfterPlayer(ctx)
    {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}