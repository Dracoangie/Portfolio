var map = {

    Start: function(){
        this.nodes= {
            bar: new MapNode("bar", 11, 11, [
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                ["cinema", 0, 0, 1, 2, 0, 1, 0, 0, 0, "artGallery"],
                [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
                [1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, "room", 1, 1, 1, 1, 1],
            ], 0, 0),
            room: new MapNode("room",5, 5, [
                [1, 1, "bar", 1, 1],
                [0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ], 10, 3),
            cinema: new MapNode("cinema",5, 5, [
                [0, 1, 1, 1, 1],
                [0, 0, 1, 0, 1],
                [1, 0, 0, 0, "bar"],
                [0, 0, 0, 0, 1],
                [1, 1, 0, 1, 1]
            ], 3, -4),
            artGallery: new MapNode("artGallery",5, 5, [
                [1, 1, 0, 1, 0],
                [1, 0, 0, 0, 0],
                ["bar", 0, 1, 1, 1],
                [1, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ], 3,10),
        };
        this.actualNode =  this.nodes.bar;
        this.actualNode.start();
    },

    Update: function(){
        this.MouseTouch()
    },

    MouseTouch: function()
    {
        if(Input.IsMousePressed()){
            if(this.doOnce == false)
            {
                this.doOnce = true;
                Input.mouse.up = true;
                Input.mouse.pressed = false;

                this.actualNode.checkposition(Input.mouse.x + camera.x,Input.mouse.y + camera.y);
            }
            else
                this.doOnce = false;
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