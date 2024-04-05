class Scene{

    
    canvasLastWidtht = null;
    canvasLastHeight = null;
    bgimage = null;
    roomimage = null;
    galleryimage = null;
    cinemaimage = null;
    objects = [];

    constructor(){

        this.canvasLastWidtht=0
        this.canvasLastHeight=0

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
        controller.ctx.translate(player.x, player.y);
    }

    Update(deltaTime)
    {
        player.Update(deltaTime, this.objects);
        this.objects.forEach(Collision => Collision.Update(deltaTime));
        this.canvasDimensionsFix();
    }

    
    canvasDimensionsFix()
    {
        if(this.canvasLastWidtht != window.innerWidth || this.canvasLastHeight != window.innerHeight)
        {
            controller.canvas.width=window.innerWidth
            controller.canvas.height=window.innerHeight
            if(controller.canvas.width > canvasMaxWidth)
            {
                controller.canvas.height=(window.innerHeight/window.innerWidth) * canvasMaxWidth
                controller.canvas.width=canvasMaxWidth;
            }
            else if(controller.canvas.height > canvasMaxHeight)
            {
                controller.canvas.height=canvasMaxHeight
                controller.canvas.width=(window.innerHeight/window.innerWidth) * canvasMaxHeight
            }
            this.canvasLastWidtht = window.innerWidth;
            this.canvasLastHeight = window.innerHeight;
        }
    }

    Render(ctx)
    {
        controller.ctx.transform()
        
        controller.ctx.translate(player.x, player.y);
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
        //ctx.translate(-player.speed * player.horDir, -player.speed*0.75 * player.verDir);
    }

}