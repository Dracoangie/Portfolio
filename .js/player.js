var player =
{
    x:0,
    y:0,
    width: 32,
    height: 32,
    imgplayer: new Image,
    pos : { x: 0, y: 0 },
    path: {},

    speed:2,

    timeanim:0,
    posXanim: 0,
    posYanim: 0,

    horDir: 0,
    verDir: 0,

    doOnce: false,

    Start: function() 
    {
        this.speed = 20;
        this.imgplayer = new Image(0, 0);
        this.imgplayer.src = "img/Personaje.png";
        
        this.timeAnim = 0;
    },

    setPosition: function(x,y, a ,b)
    {
        this.pos = {x,y};
        this.x = a;
        this.y = b;
    },

    Update: function(deltaTime)
    {
        this.moveInMap(deltaTime);
        this.AnimationDirector(deltaTime);
    },

    moveInMap: function(deltaTime) {
        if (this.path.length > 0) {
            // Calcula la posición de destino en el mapa
            var targetX = map.actualNode.pos[this.path[0].x][ this.path[0].y].x ;
            var targetY = map.actualNode.pos[this.path[0].x][ this.path[0].y].y - 42;
            
            // Interpola suavemente la posición del jugador hacia la posición de destino
            this.x += (targetX - this.x) * deltaTime * this.speed;
            this.y += (targetY - this.y) * deltaTime * this.speed;
    
            // Si el jugador está lo suficientemente cerca de la posición de destino, pasa a la siguiente posición en la ruta
            if (Math.abs(this.x - targetX) < 1 && Math.abs(this.y - targetY) < 1) {
                this.x = targetX;
                this.y = targetY;
                this.pos = {x: this.path[0].x, y: this.path[0].y};
                this.path.shift();
                if(this.path.length == 0 && map.actualNode.changeRoom != null)
                {
                    map.changeRoom(map.actualNode.changeRoom);
                    map.actualNode.changeRoom = null;
                    console.log("fin");
                }
            }
            
        }
    },

    AnimationDirector: function(deltaTime){
        
        if(this.timeAnim > 0.1){
            newframe = true;
            this.timeAnim = 0;
        }
        else newframe = false;
        if(newframe){
            if(this.posXanim > 4){
                this.posXanim =0;
            }
            this.posXanim ++;
        }
        this.timeAnim += deltaTime;
        
    },

    setPath: function( path){

        this.path = path;
    },

    Draw: function(ctx)
    {
        ctx.drawImage(this.imgplayer, this.posXanim * 64, this.posYanim * 64, 64, 64, this.x, this.y, 64, 64);

    }
}
