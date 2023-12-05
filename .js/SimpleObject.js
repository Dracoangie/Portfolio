class SimpleObject extends Collision
{
    inTrigger = false;

    constructor(x, y, width, height, imgSrc, tag)
    {
        super(); 
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image;
        this.img.src = imgSrc;
        this.tag = tag;
    }

    Start()
    {
    }

    Update(deltaTime)
    {
        this.mouse();
    }

    mouse()
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
    }

    isInTrigger(){
        if(this.inTrigger == false)
        {
            this.inTrigger = true;
            // dependiendo del tag que tenga este trigger, al entrar el jugador hará una cosa y otra
            switch(this.tag){
                case 'arbusto':
                    console.log("arbusto isInTrigger");
                    break;
                default:
                    console.log("tag not found");
            }
        }
    }

    isOutTrigger(){
        if(this.inTrigger == true)
        {
            this.inTrigger = false;
            // dependiendo del tag que tenga este trigger, al salir el jugador hará una cosa y otra
            switch(this.tag){
                case 'arbusto':
                    console.log("arbusto isOutTrigger");
                    break;
                default:
                    console.log("tag not found");
            }
        }
    }

    Draw(ctx)
    {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}