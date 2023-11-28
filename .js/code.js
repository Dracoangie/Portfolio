//Inicialize Start & Loop 
const controller={
    
    canvas:null,
    ctx:null,
    scene:null,
    bgimage:null,
    collision:[],

    onload:()=>
    {
        let canvas = document.getElementById("myCanvas");
        canvas.height=580
        canvas.width=1200
        canvas.style.width=3600
        canvas.style.height=2400
        controller.canvas=canvas;
        controller.ctx = controller.canvas.getContext("2d");

        SetupKeyboardEvents();
        SetupMouseEvents(controller.canvas);

        Start(controller.canvas);
        Loop();
    }
}
//When window refreshes, controller too
window.onload = controller.onload;

//Create timer (deltatimer)
const timer={
    targetdelta : 1 / 60,
    currentdelta : 0,
    time : 0,
    FPS  : 0,
    frames    : 0,
    acumDelta : 0,
    sinceBegining : 0,
    pause : false,
    start : true,
    reStart : false,
    loop:()=>{
        //Deltatimer
        const now = Date.now();
        timer.currentdelta = (now - timer.time) / 1000;
        timer.time = now;

        //Frames count
        timer.frames++;
        timer.acumDelta += timer.currentdelta;

        if (timer.acumDelta > 1)
        {
            timer.FPS = timer.frames;
            timer.frames = 0;
            timer.acumDelta -= 1;
        }

        if (timer.currentdelta > 100)
            timer.currentdelta = 100;

        if(!timer.paused)
            timer.sinceBegining += timer.delta;
    },

    draw:(ctx)=>
    {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.fillText("FPS=" + timer.FPS, 10, 30);
        ctx.fillText("delta=" + timer.currentdelta, 10, 50);
        ctx.fillText("currentFPS=" + (1/timer.currentdelta).toFixed(2), 10, 70);
    }
}
//Start
function Start() 
{
    controller.scene = new Scene();
    controller.scene.Start();
    /*layer.Start();
    controller.bgimage = new Image();
    //Gets src direction
    controller.bgimage.src = "img/Background.png";
    controller.collision.push(new classCollision(200, 200, 100, 100, "img/arbusto.png"));
    
    controller.collision.forEach(classCollision => classCollision.Start());
*/}
//Update
function Update(deltaTime) 
{
    controller.scene.Update(deltaTime);
    //player.Update(deltaTime, controller.collision);
}
//Looping
function Loop() 
{
    timer.loop();
    Update(timer.currentdelta);
    Draw(controller.ctx);
    setTimeout(Loop,18);
}
//Drawing on screen
function Draw(ctx) 
{
    //Clears canvas
    ctx.clearRect(0, 0, controller.canvas.width, controller.canvas.height);
    controller.scene.Render(ctx);
    //Draws bgimage
    /*ctx.drawImage(controller.bgimage, 0, 0);
    //Draws collision square
    controller.collision.forEach(classCollision => classCollision.Draw(ctx));
    //Draws fps and time on screen
    timer.draw(ctx);
    //End
    player.Draw(ctx);*/
}
