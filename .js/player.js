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
    posxanim: 0,
    posyanim: 0,

    horDir: 0,
    verDir: 0,

    doOnce: false,

    Start: function() 
    {
        this.speed = 20;
        this.imgplayer = new Image(32, 32);
        this.imgplayer.src = "img/Character.png";
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
    },

    moveInMap: function(deltaTime) {
        if (this.path.length > 0) {
            // Calcula la posición de destino en el mapa
            var targetX = map.pos[[this.path[0].x, this.path[0].y]].x + 16;
            var targetY = map.pos[[this.path[0].x, this.path[0].y]].y - 8;
    
            // Interpola suavemente la posición del jugador hacia la posición de destino
            this.x += (targetX - this.x) * deltaTime * this.speed;
            this.y += (targetY - this.y) * deltaTime * this.speed;
    
            // Si el jugador está lo suficientemente cerca de la posición de destino, pasa a la siguiente posición en la ruta
            if (Math.abs(this.x - targetX) < 1 && Math.abs(this.y - targetY) < 1) {
                this.x = targetX;
                this.y = targetY;
                this.pos = {x: this.path[0].x, y: this.path[0].y};
                this.path.shift();
            }
        }
    },

    setPath: function( path){

        this.path = path;
    },

    Draw: function(ctx)
    {
        ctx.drawImage(this.imgplayer, this.posxanim * 32, this.posyanim * 32, 32, 32, this.x, this.y, 32, 32);
    }
}
