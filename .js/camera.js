var camera = {

    x: 0, // Posición x de la cámara
    y: 0, // Posición y de la cámara 
    lagSpeed: 0.1,

    Start: function(){
        this.adjustSize();
        this.centerOn(player.x, player.y);
        window.addEventListener("resize", this.adjustSize.bind(this)); // Escucha el evento de cambio de tamaño de la ventana
    },

    Update:function(){
        this.x += (player.x - controller.canvas.width / 2 - this.x) * this.lagSpeed;
        this.y += (player.y - controller.canvas.height / 2 -this.y) * this.lagSpeed;
    },

    // Método para centrar la cámara en una posición (por ejemplo, el jugador)
    centerOn: function(x, y) {
        this.x = x - controller.canvas.width / 2;
        this.y = y - controller.canvas.height / 2;
    },

    adjustSize: function() {
        this.width = Math.min(controller.canvas.width, window.innerWidth);
        this.height = Math.min(controller.canvas.height, window.innerHeight);
    },

    Draw: function(ctx)
    {
        ctx.translate(-this.x, -this.y);
    }

}
