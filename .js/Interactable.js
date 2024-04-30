class interactable{

    constructor( x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
 
    }

    Update()
    {
        this.Interaction();
    }

    Interaction()
    {
        if (isMobileDevice() && Input.IsScreenTouch()) {
            
            if(this.doOnce == false)
            {
                if(isPointInsideSquare(Input.touch.x + camera.x, Input.touch.y + camera.y, this))
                {
                    modal.classList.add('modal--show')
                    Input.touch.up = true;
                    Input.touch.pressed = false;
                    
                    this.doOnce = true;
                } 
            }
            else
                this.doOnce = false;
        }
        else {
            if(Input.IsMousePressed())
            {
                if(this.doOnce == false)
                {
                    if(isPointInsideSquare(Input.mouse.x + camera.x, Input.mouse.y + camera.y, this))
                    {
                        modal.classList.add('modal--show')
                        Input.mouse.up = true;
                        Input.mouse.pressed = false;
                        
                        this.doOnce = true;
                    } 
                }
                else
                    this.doOnce = false;
            }
        }
    }

    Draw(ctx){
        ctx.beginPath();
        ctx.Style = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}