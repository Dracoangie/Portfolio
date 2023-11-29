class Scene{

    
    bgimage = null;
    collisions = [];
    tallercollisions = [];

    constructor(){
        this.bgimage = new Image();
        //Gets src direction
        this.bgimage.src = "img/Background.png";
        this.collisions.push(new classCollision(200, 200, 100, 100, "img/arbusto.png"));
        this.tallercollisions.push(new tree(200,400));
    
    }

    Start()
    {
        player.Start();
        this.collisions.forEach(classCollision => classCollision.Start());
        this.tallercollisions.forEach(tallerCollision => tallerCollision.Start());

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
        this.tallercollisions.forEach(tallerCollision => tallerCollision.Draw(ctx));
        this.collisions.forEach(classCollision => classCollision.Draw(ctx));
        //Draws player
        player.Draw(ctx);
        this.tallercollisions.forEach(tallerCollision => tallerCollision.DrawAfterPlayer(ctx));
    }

}