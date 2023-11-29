class tree extends tallerCollision {

    constructor(x, y) {
        super(x, y); 
        this.imgColl.src = "img/tronco.png";
        this.imgAFPlayer.src = "img/tree.png";
        this.width = 18;
        this.height = 12;
        this.x = this.PosX - this.width/2 + 58/2;
        this.y = this.PosY + 40;
    }
}