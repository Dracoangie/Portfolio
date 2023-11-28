class Scene{

    
    bgimage = null;
    collisions = [];

    constructor(){
        this.bgimage = new Image();
        //Gets src direction
        this.bgimage.src = "img/Background.png";
        this.collisions.push(new classCollision(200, 200, 100, 100, "img/arbusto.png"));
    
    }

    Start()
    {
        player.Start();
        this.collisions.forEach(classCollision => classCollision.Start());

    }

    Update(deltaTime)
    {
        player.Update(deltaTime, this.collisions);
    }

    Render(ctx)
    {
        //Draws bgimage
        ctx.drawImage(this.bgimage, 0, 0);
        //Draws collision square
        this.collisions.forEach(classCollision => classCollision.Draw(ctx));
        //Draws player
        player.Draw(ctx);
    }

}