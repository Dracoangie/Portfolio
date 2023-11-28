var player =
{
    X:0,
    y:0,
    width: 32,
    height: 32,
    imgplayer: new Image,

    speed:2,

    timeanim:0,
    posxanim: 0,
    posyanim: 0,

    horDir: 0,
    verDir: 0,

    Start: function() 
    {
        this.x = this.y = 400;
        this.speed = 2;
        this.imgplayer = new Image(32, 32);
        this.imgplayer.src = "img/Character.png";
    },

    Update: function(deltaTime, others)
    {
        this.Action();
        this.AnimationDir(deltaTime);
        this.Collision(others);
        this.mouse();
    },

    Action: function()
    {
        this.posyanim = 0;
        this.verDir = 0;
        this.horDir = 0;
        

        if(Input.IsKeyPressed(KEY_UP) ||Input.IsKeyPressed(KEY_W))
        {
            this.posyanim = 3;
            this.verDir = -1;
        }
        if(Input.IsKeyPressed(KEY_DOWN)||Input.IsKeyPressed(KEY_S))
        {
            this.posyanim = 1;
            this.verDir = 1;
        }
        if(Input.IsKeyPressed(KEY_LEFT)||Input.IsKeyPressed(KEY_A))
        {
            this.posyanim = 4;
            this.horDir = -1;
        }
        if(Input.IsKeyPressed(KEY_RIGHT)||Input.IsKeyPressed(KEY_D))
        {
            this.posyanim = 2;
            this.horDir = 1;
        }
        
        this.x = this.x + (this.speed * this.horDir);
        this.y = this.y + (this.speed * this.verDir);
        
    },

    AnimationDir: function(deltaTime)
    {
        if(this.timeanim > 0.2)
        {
            this.timeanim = 0;
            this.posxanim += 1;
            if(this.posxanim > 3)
                this.posxanim = 0;
        }
        this.timeanim += deltaTime;
    },

    Collision: function(others)
    {
        //collider based on the speed
        let DirCollisionRect = {
            x: this.x + (this.speed * this.horDir),
            y: (this.y + this.height/2) + (this.speed * this.verDir),
            width: this.width,
            height: this.height/2
        }
        //Collision detected
        for(let i = 0; i < others.length; i++){
            if(IsColliding(DirCollisionRect, others[i]))
            {
                while(IsColliding(DirCollisionRect, others[i]))
                {
                    DirCollisionRect.x -= this.speed* this.horDir;
                    DirCollisionRect.y -= this.speed* this.verDir;
                }
                this.x = DirCollisionRect.x;
                this.y = DirCollisionRect.y - this.height/2;
            }
        }
    },

    mouse: function()
    {
        if(Input.IsMousePressed() && isPointInsideSquare(Input.mouse, this)){
            
            console.log(Input.mouse.x ,Input.mouse.y);
            console.log(this.x ,this.y);
        }
    },
    
    Draw: function(ctx)
    {
        //ctx.rect(this.x, this.y + (this.height/2), this.width, this.height/2);
                
        //ctx.fill();
        ctx.drawImage(this.imgplayer, this.posxanim * 32, this.posyanim * 32, 32, 32, this.x, this.y, 32, 32);
    }
}
