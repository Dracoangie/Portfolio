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
        this.speed = 0.2;
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

    moveInMap(deltaTime)
    {
        if(this.path.length > 0)
        {
            this.speed = this.speed - deltaTime;
            if(this.speed < 0)
            {            
                this.x = map.pos[[this.path[0].x,this.path[0].y]].x + 16;
                this.y = map.pos[[this.path[0].x,this.path[0].y]].y -8;
                this.pos = {x: this.path[0].x, y:this.path[0].y};
                this.path.shift();
                this.speed = 0.2;
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
