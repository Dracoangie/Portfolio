class interactable{

    constructor( x, y, width, height, tag){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tag = tag;
 
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
                    this.InteractionType();
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
                        this.InteractionType();
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

    InteractionType()
    {
        switch(this.tag)
        {
            case "ArtGallery":
                artGalleryModal.classList.add('modal--show');
                break;
            case "Cinema":
                cinemaModal.classList.add('modal--show');
                break;
            case "Room":
                roomModal.classList.add('modal--show');
                break;
            case "Bar":
                barModal.classList.add('modal--show');
                break;
        }
    }

    Draw(ctx){
        ctx.beginPath();
        ctx.Style = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}