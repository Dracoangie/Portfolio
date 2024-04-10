var map = {

    posWidth : 3,
    posHeight : 10,
    pos : [ [,]],
    grid: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Representación de tu matriz, 0 es transitable
        [0, 1, 0, 1, 2, 0, 1, 0, 1, 0], // 1 representa obstáculos
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    ],
    bgimage : new Image(),

    Start: function(){
        this.MapCreate();
        this.bgimage.src = "img/suelo.png";
    },
    
    MapCreate: function(){

        for (var i = 0; i < this.posWidth; i++) {
            for (let j = 0; j < this.posHeight; j++) {
          
                this.pos[[i, j]] =  { x: controller.canvas.width/2+i*32-j*32, y: controller.canvas.height/2+j*16+i*16};
                if(this.grid[i][j] === 2){
                    player.setPosition(i,j, this.pos[[i, j]].x , this.pos[[i, j]].y- 42);
                    this.grid[i][j] = 0;
                }
            }
        }
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
    
                for (var i = 0; i < this.posWidth; i++) {
                    for (let j = 0; j < this.posHeight; j++) {
    
                        // Ajusta las coordenadas del ratón en relación con la posición de la cámara y la posición del mapa en la pantalla
                        const mouseX = Input.mouse.x + camera.x;
                        const mouseY = Input.mouse.y + camera.y;
    
                        const x = this.pos[[i, j]].x + 32;
                        const y = this.pos[[i, j]].y + 16;
    
                        // Verifica si el clic del ratón está dentro de los límites del mapa
                        if(IsInDiamond(mouseX, mouseY, x, y, 64, 16) && this.grid[i][j] === 0) {
                            player.setPath(this.aStar(player.pos, { x : i, y: j}, this.grid));
                            break;
                        }
                    }
                }
            }
            else
                this.doOnce = false;
        }
    },

    aStar: function (start, goal, grid) {
        const openSet = [start];
        const cameFrom = new Map();
        const gScore = new Map(); // Cost from start to a node
        const fScore = new Map(); // Estimated cost from start to goal through a node
    
        gScore.set(start, 0);
        fScore.set(start, this.heuristic(start, goal));
    
        while (openSet.length > 0) {
            let current = openSet.reduce((a, b) => fScore.get(a) < fScore.get(b) ? a : b);
    
            if (current.x === goal.x && current.y === goal.y) {

                return this.reconstructPath(cameFrom, current);
            }
    
            openSet.splice(openSet.indexOf(current), 1);
            for (let neighbor of this.getNeighbors(current, grid)) {
                let tentativeGScore = gScore.get(current) + 1; // Assumes cost of 1 for moving to a neighbor
                if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
                    cameFrom.set(neighbor, current);
                    gScore.set(neighbor, tentativeGScore);
                    fScore.set(neighbor, tentativeGScore + this.heuristic(neighbor, goal));
                    if (!openSet.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return false; // Fail to find the path
    },
    
    heuristic: function (a, b) {
        // Manhattan distance on a square grid
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    },
    
    getNeighbors: function (node, grid) {
        const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // Direcciones: abajo, derecha, arriba, izquierda
        const result = [];
        for (let [dx, dy] of dirs) {
            let newX = node.x + dx, newY = node.y + dy;
            // Asegura que el nuevo punto esté dentro de los límites de la matriz y no sea un obstáculo
            if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length && grid[newX][newY] === 0) {
                result.push({x: newX, y: newY});
            }
        }
        return result;
    },
    
    reconstructPath: function (cameFrom, current) {
        const path = [];
        while (cameFrom.has(current)) {
            path.unshift(current);
            current = cameFrom.get(current);
        }
        return path;
    },

    Draw: function(ctx, camera)
    {
        for (var i = 0; i < this.posWidth; i++) {
            for (let j = 0; j < this.posHeight; j++) {
                if(this.grid[i][j] === 0 || this.grid[i][j] === 2) {
                    // Calcula la posición de la imagen teniendo en cuenta la posición de la cámara
                    const imageX = controller.canvas.width / 2 + i * 32 - j * 32 ;
                    const imageY = controller.canvas.height / 2 + j * 16 + i * 16 ;
                    ctx.drawImage(this.bgimage, imageX, imageY);
                }
            }
        }

    }
}