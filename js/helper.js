function IsColliding(square1, square2)
{
    if(square1.x >= square2.x + square2.width ||
    square1.x + square1.width <= square2.x||
    square1.y >= square2.y + square2.height||
    square1.y + square1.height <= square2.y)
    {
        return false;
    }
    return true;
}

function isPointInsideSquare(point, square){

    if (point.x >= square.x && point.x <= square.x + square.width &&
        point.y >= square.y && point.y <= square.y + square.height) {
        return true;
    }
    return false;
}

function isPointInsideSquare(x,y, square){

    if (x >= square.x && x <= square.x + square.width &&
        y >= square.y && y <= square.y + square.height) {
        return true;
    }
    return false;
}

function isInTrigger(first, second)
{
    let trigger = {
        x: second.x - first.width/4,
        y: second.y - first.height/4,
        width: second.width + first.width/2,
        height: second.height  + first.height/2
    }

    if(IsColliding(first, trigger))
    {
        return true;
    }
    return false;
}

function IsInDiamond(x, y, a, b, dl, dc) {


    // Ajustar las coordenadas del punto respecto al nuevo centro del rombo
    let xp = x - a;
    let yp = y - b;

    // Verificar si el punto ajustado está dentro del rombo
    if (Math.abs(xp) / (dl / 2) + Math.abs(yp) / dc <= 1) {
        return true;
    } else {
        return false;
    }
}

function isMobileDevice() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Patrones para detectar los principales tipos de dispositivos móviles
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
}