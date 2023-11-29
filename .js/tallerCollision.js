class tallerCollision
{
    
    imgColl = new Image;
    imgAFPlayer = new Image;
    width;
    height;
    PosX;
    Posy;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    Start()
    {
    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        ctx.drawImage(this.imgColl, this.PosX, this.PosY, this.width, this.height);
    }

    DrawAfterPlayer(ctx)
    {
        ctx.drawImage(this.imgAFPlayer, this.x, this.y);
    }
}