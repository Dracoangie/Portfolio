class Scene{

    
    bgimage = null;
    collisions = [];
    tallercollisions = [];
    objects = [];

    constructor(){
        this.bgimage = new Image();
        //Gets src direction
        this.bgimage.src = "img/Background.png";
        //this.collisions.push(new SimpleObject(200, 200, 100, 100, "img/arbusto.png"));
        //this.tallercollisions.push(new tree(200,400));
        this.objects.push(new SimpleObject(200, 200, 100, 100, "img/arbusto.png"));
        this.objects.push(new tree(200,400));
    
    }

    Start()
    {
        player.Start();
        //this.collisions.forEach(SimpleObject => SimpleObject.Start());
        //this.tallercollisions.forEach(ComplexObject => ComplexObject.Start());

    }

    Update(deltaTime)
    {
        player.Update(deltaTime, this.objects);

    }

    Render(ctx)
    {
        //Draws bgimage
        ctx.drawImage(this.bgimage, 0, 0);
        //Draws collision square
        this.objects.forEach(Collision => Collision.Draw(ctx));
        //this.collisions.forEach(SimpleObject => SimpleObject.Draw(ctx));
        //Draws player
        player.Draw(ctx);
        this.objects.forEach(ComplexObject => ComplexObject.DrawAfterPlayer(ctx));
        //this.tallercollisions.forEach(ComplexObject => ComplexObject.DrawAfterPlayer(ctx));
    }

}