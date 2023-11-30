class ComplexObject extends Collision
{
    
    imgColl = new Image;
    imgAFPlayer = new Image;
    PosX;
    PosY;

    constructor(x, y)
    {
        super(); 
        this.PosX = x;
        this.PosY = y;
    }

    Start()
    {
    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        ctx.drawImage(this.imgColl, this.x, this.y, this.width, this.height);
    }

    DrawAfterPlayer(ctx)
    {
        ctx.drawImage(this.imgAFPlayer, this.PosX, this.PosY);
    }
}