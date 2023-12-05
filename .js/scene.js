class Scene{

    
    bgimage = null;
    roomimage = null;
    galleryimage = null;
    cinemaimage = null;
    objects = [];

    constructor(){
        //----------------------------- aqui creamos los objetos de la imagen --------------------------------
        this.bgimage = new Image();
        this.roomimage = new Image();
        this.galleryimage = new Image();
        this.cinemaimage = new Image();
        //Gets src direction
        this.bgimage.src = "img/Escenario.png";
        this.roomimage.src = "img/Room.png";
        this.galleryimage.src = "img/ArtGallery.png";
        this.cinemaimage.src = "img/Cinema.png";

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
        ctx.drawImage(this.roomimage, 0, 0);
        ctx.drawImage(this.galleryimage, 0, 0);
        ctx.drawImage(this.cinemaimage, 0, 0);
        //Draws collision square
        this.objects.forEach(Collision => Collision.Draw(ctx));
        //Draws player
        player.Draw(ctx);
        //Drwas after player
        this.objects.forEach(ComplexObject => ComplexObject.DrawAfterPlayer(ctx));
    }

}