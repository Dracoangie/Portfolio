var map = {


    outside: 0,
    grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Representación de tu matriz, 0 es transitable
        [0, 1, 0, 1, 2, 0, 1, 0, 1, 0], // 1 representa obstáculos
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    ],
    bgimage : new Image(),

    Start: function(){
        this.outside= new MapNode(3, 10, this.grid),
        //this.MapCreate();
        this.outside.start();
        //this.bgimage.src = "img/suelo.png";
    },
    
    MapCreate: function(){

        for (var i = 0; i < this.posWidth; i++) {
            for (let j = 0; j < this.posHeight; j++) {
          
                this.pos[[i, j]] =  { x: controller.canvas.width/2+i*32-j*32, y: controller.canvas.height/2+j*16+i*16};
                if(this.grid[i][j] === 2){
                    player.setPosition(i,j, this.pos[[i, j]].x , this.pos[[i, j]].y- 42);
                    this.grid[i][j] = 0;
                }
            }
        }
    },

    Update: function(){
        this.MouseTouch()
    },

    MouseTouch: function()
    {
        if(Input.IsMousePressed()){
            if(this.doOnce == false)
            {
                this.doOnce = true;
                Input.mouse.up = true;
                Input.mouse.pressed = false;

                this.outside.checkposition(Input.mouse.x + camera.x,Input.mouse.y + camera.y);
            }
            else
                this.doOnce = false;
        }
    },

    Draw: function(ctx, camera)
    {
        this.outside.draw(ctx);

    }
}