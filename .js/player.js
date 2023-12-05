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

    trigger:[],
    doOnce: false,

    Start: function(Triggers) 
    {
        this.x = this.y = 400;
        this.speed = 2;
        this.imgplayer = new Image(32, 32);
        this.imgplayer.src = "img/Character.png";
        this.hasTriggers(Triggers);
    },

    Update: function(deltaTime, others)
    {
        this.Action();
        this.AnimationDir(deltaTime);
        this.Collision(others);
        this.mouse();
    },

    //--- Chequea las colisiones de scene y guarda las que sean un trigger ---
    hasTriggers: function(Triggers)
    {
        for(let i = 0; i < Triggers.length; i++)
        {
            if(Triggers[i].tag != null)
                this.trigger.push(Triggers[i]);
        }
    },

    //--- Registra los de input asociados al player y actua en consecuencia (movimiento del jugador e interacciones) ---
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

    //--- Chequea la dirección en la que se mueve el jugador y le asigna la animacion correspondiente ---
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

    //--- Gestiona las colisiones y los triggers ---
    Collision: function(colliders)
    {
        //collider based on the speed
        let DirCollisionRect = {
            x: this.x + (this.speed * this.horDir),
            y: (this.y + this.height/2) + (this.speed * this.verDir),
            width: this.width,
            height: this.height/2
        }
        //Collision detected
        for(let i = 0; i < colliders.length; i++){
            if(IsColliding(DirCollisionRect, colliders[i]))
            {
                while(IsColliding(DirCollisionRect, colliders[i]))
                {
                    DirCollisionRect.x -= this.speed* this.horDir;
                    DirCollisionRect.y -= this.speed* this.verDir;
                }
                this.x = DirCollisionRect.x;
                this.y = DirCollisionRect.y - this.height/2;
            }
        }

        //Trigger detected
        for(let i = 0; i < this.trigger.length; i++){
            // si ha detectado que está dentro del trigger llama a la funcion isInTrigger del trigger 
            if(isInTrigger(DirCollisionRect, this.trigger[i]))
            {
                // dependiendo del tag que tenga el trigger se define lo que hará el jugador
                switch(this.trigger[i].tag){
                    case 'arbusto':
                        break;
                    default:
                        console.log("tag not found");
                }
                this.trigger[i].isInTrigger();
            }
            //sino entra en el trigger llama a la funcion isOutTrigger del trigger
            else
            {
                // dependiendo del tag que tenga el trigger se define lo que hará el jugador
                switch(this.trigger[i].tag){
                    case 'arbusto':
                        break;
                    default:
                        console.log("tag not found");
                }
                this.trigger[i].isOutTrigger();
            }
        }
    },

    mouse: function()
    {
        if(Input.IsMousePressed() && isPointInsideSquare(Input.mouse, this)){
            if(this.doOnce == false)
            {
                this.doOnce = true;
                modal.classList.add('modal--show');
                Input.mouse.up = true;
                Input.mouse.pressed = false;
            }
        }
        else
        this.doOnce = false;
    },
    
    Draw: function(ctx)
    {
        //ctx.rect(this.x, this.y + (this.height/2), this.width, this.height/2);
        //ctx.fill();
        ctx.drawImage(this.imgplayer, this.posxanim * 32, this.posyanim * 32, 32, 32, this.x, this.y, 32, 32);
    }
}
