class classCollision
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    Start()
    {

    }

    Update(deltaTime)
    {

    }

    Draw(ctx)
    {
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}