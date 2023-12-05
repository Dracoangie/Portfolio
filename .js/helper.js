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