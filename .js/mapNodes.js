class MapNode{
    constructor(width, height, grid) {
        this.width = width;
        this.height = height;
        this.grid = grid;
        this.bgimage = new Image();
        this.bgimage.src = "img/suelo.png";
        this.pos = [];

        // Inicializando el array multidimensional
        for (let i = 0; i < width; i++) {
            this.pos[i] = new Array(height);
        }
    }

    mapCreate() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.pos[i][j] = {
                    x: controller.canvas.width / 2 + i * 32 - j * 32,
                    y: controller.canvas.height / 2 + j * 16 + i * 16
                };
                if (this.grid[i][j] === 2) {
                    player.setPosition(i, j, this.pos[i][j].x, this.pos[i][j].y - 42);
                    this.grid[i][j] = 0;
                }
            }
        }
        console.log(this.pos);
    }

    start(){
        this.mapCreate();
    }

    checkposition(mouseX, mouseY){
        for (var i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                const x = this.pos[i][j].x + 32;
                const y = this.pos[i][j].y + 16;

                // Verifica si el clic del ratón está dentro de los límites del mapa
                if(IsInDiamond(mouseX, mouseY, x, y, 64, 16) && this.grid[i][j] === 0) {
                    player.setPath(this.aStar(player.pos, { x : i, y: j}, this.grid));
                    break;
                }
            }
        }
    }

    aStar (start, goal, grid) {
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
    }
    
    heuristic (a, b) {
        // Manhattan distance on a square grid
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }
    
    getNeighbors (node, grid) {
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
    }
    
    reconstructPath (cameFrom, current) {
        const path = [];
        while (cameFrom.has(current)) {
            path.unshift(current);
            current = cameFrom.get(current);
        }
        return path;
    }

    draw(ctx){
        for (var i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
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