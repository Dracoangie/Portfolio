var map = {

    posWidth : 10,
    posHeight : 10,
    pos : [ [,]],
    bgimage : new Image(),

    Start: function(){
        this.MapCreate();
        this.bgimage.src = "img/suelo.png";
    },
    
    MapCreate: function(){

        for (var i = 0; i < this.posWidth; i++) {
            for (let j = 0; j < this.posHeight; j++) {
          
                this.pos[[i, j]] =  { x: controller.canvas.width/2+i*32-j*32, y: controller.canvas.height/2+j*16+i*16};
          
            }
        }
        console.log(this.pos);
    },

    Update: function(){
        this.MouseTouch()
    },

    MouseTouch: function()
    {
        if(Input.IsMousePressed()){
            if(this.doOnce == false)
            {
                //this.doOnce = true;
                //Input.mouse.up = true;
                //Input.mouse.pressed = false;
                dentro = false;

                for (var i = 0; i < this.posWidth; i++) {
                    for (let j = 0; j < this.posHeight; j++) {

                        x = this.pos[[i, j]].x + 32;
                        y = this.pos[[i, j]].y + 16;

                        if(IsInDiamond(Input.mouse.x,Input.mouse.y, x, y, 64, 16))
                        {
                            dentro = true;
                            player.mouseMove(x,y);
                            break;
                        }
                    }
                }
                if(dentro)
                    console.log("dentro");
                else
                    console.log("fuera");
            }
            else
                this.doOnce = false;
        }
    },

    Draw: function(ctx)
    {
        for (var i = 0; i < this.posWidth; i++) {
            for (let j = 0; j < this.posHeight; j++) {
          
                ctx.drawImage(this.bgimage,controller.canvas.width/2+i*32-j*32,controller.canvas.height/2+j*16+i*16);
          
            }
        }

    }
}