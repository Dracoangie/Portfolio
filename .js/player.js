var player =
{
    X:0,
    i:0,
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
    },

    Action: function()
    {
        this.posyanim = 0;
        this.verDir = 0;
        this.horDir = 0;
        

        if(Input.IsKeyPressed(KEY_UP))
        {
            this.posyanim = 3;
            this.verDir = -1;
        }
        if(Input.IsKeyPressed(KEY_DOWN))
        {
            this.posyanim = 1;
            this.verDir = 1;
        }
        if(Input.IsKeyPressed(KEY_LEFT))
        {
            this.posyanim = 4;
            this.horDir = -1;
        }
        if(Input.IsKeyPressed(KEY_RIGHT))
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
        // vertical and horizontal colliders based on the speed
        let DirCollisionRect = {
            x: this.x + (this.speed * this.horDir),
            y:this.y + (this.speed * this.verDir),
            width: this.width,
            height: this.height
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
                this.y = DirCollisionRect.y;
            }
        }
    },
    
    Draw: function(ctx)
    {
        ctx.drawImage(this.imgplayer, this.posxanim * 32, this.posyanim * 32, 32, 32, this.x, this.y, 32, 32);
    }
}
