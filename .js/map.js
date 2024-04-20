var map = {

    Start: function(){
        this.nodes= {
            bar: new MapNode(10, 10, [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 2, 0, 1, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
                [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
                [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]
            ]),
            room: new MapNode(5, 5, [
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ]),
            cinema: new MapNode(5, 5, [
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ]),
            artGalery: new MapNode(5, 5, [
                [0, 1, 0, 1, 0],
                [0, 0, 1, 0, 0],
                [1, 0, 1, 1, 1],
                [0, 0, 0, 0, 0],
                [1, 1, 0, 1, 0]
            ]),
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

    Draw: function(ctx, camera)
    {
        this.actualNode.draw(ctx);

    }
}