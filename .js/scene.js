class Scene{

    
    bgimage = null;
    objects = [];

    constructor(){
        //----------------------------- aqui creamos los objetos de la imagen --------------------------------
        this.bgimage = new Image();
        //Gets src direction
        this.bgimage.src = "img/Background.png";

        // variables de simpleobjects:      x    y     width  height       img            tag
        this.objects.push(new SimpleObject(200, 200,   100,   100,    "img/arbusto.png", "arbusto"));
        
        // variables de tree:        x  y  
        this.objects.push(new tree(200,400));
    
    }

    Start()
    {
        player.Start(this.objects);
    }

    Update(deltaTime)
    {
        player.Update(deltaTime, this.objects);
        this.objects.forEach(Collision => Collision.Update(deltaTime));
    }

    Render(ctx)
    {
        //Draws bgimage
        ctx.drawImage(this.bgimage, 0, 0);
        //Draws collision square
        this.objects.forEach(Collision => Collision.Draw(ctx));
        //Draws player
        player.Draw(ctx);
        //Drwas after player
        this.objects.forEach(ComplexObject => ComplexObject.DrawAfterPlayer(ctx));
    }

}