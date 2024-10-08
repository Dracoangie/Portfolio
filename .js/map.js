var map = {

    Start: function(bar, artGallery, room, cinema){
        this.nodes= {
            bar: new MapNode("bar", 14, 14, [
                [1, 1, 0, 0, 0, 0, "artGallery", 0, 1, 1, 1, 1, 1, 1],
                [1, "room", 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                ["cinema", 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
            ], 0, 0,bar),
            room: new MapNode("room",5, 5, [
                [1, 1, "bar", 1, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ], 0, 0,room),
            cinema: new MapNode("cinema",5, 5, [
                [0, 1, 1, 1, 1],
                [0, 0, 1, 0, 1],
                [1, 0, 0, 0, "bar"],
                [0, 0, 0, 0, 1],
                [1, 1, 0, 1, 1]
            ], 0, 0, cinema),
            artGallery: new MapNode("artGallery",5, 5, [
                [1, 1, 0, 1, 0],
                [1, 0, 0, 0, 0],
                ["bar", 0, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ], 0,0,artGallery),
        };
        this.actualNode =  this.nodes.bar;
        this.actualNode.start();
    },

    Update: function(){
        this.actualNode.updateInteractions();
        this.MouseTouch()
    },

    MouseTouch: function()
    {
        if (isMobileDevice()) {
            if(Input.IsScreenTouch()){
                if(this.doOnce == false)
                {
    
                    if(this.actualNode.checkposition(Input.touch.x + camera.x,Input.touch.y + camera.y))
                    {
                        Input.touch.up = true;
                        Input.touch.pressed = false;
                        this.doOnce = true;
                    }
                }
                else
                    this.doOnce = false;
            }
        }
        else {
            if(Input.IsMousePressed()){
                if(this.doOnce == false)
                {
                    if(this.actualNode.checkposition(Input.mouse.x + camera.x,Input.mouse.y + camera.y))
                    {
                        Input.mouse.up = true;
                        Input.mouse.pressed = false;
                        this.doOnce = true;
                    }
                }
                else
                    this.doOnce = false;
            }
            
        }
       
    },

    changeRoom: function(tag)
    {
        var lastnode = this.actualNode;
        switch(tag){
            case "room":
                this.actualNode = this.nodes.room;
                break;
                
            case "bar":
                this.actualNode = this.nodes.bar;
                break;
                
            case "cinema":
                this.actualNode = this.nodes.cinema;
                break;
                
            case "artGallery":
                this.actualNode = this.nodes.artGallery;
                break;
        }
        this.actualNode.lastNodeTag = lastnode.tag;
        this.actualNode.start();
    },

    Draw: function(ctx, camera)
    {
        this.actualNode.draw(ctx);

    }
}