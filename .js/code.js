//Inicialize Start & Loop 
const controller={
    
    canvas:null,
    ctx:null,
    scene:null,

    onload:()=>
    {
        let canvas = document.getElementById("myCanvas");
        canvas.width=window.innerWidth
        canvas.height=window.innerHeight
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
}

//Update
function Update(deltaTime) 
{
    controller.scene.Update(deltaTime);
    controller.canvas.width=window.innerWidth
    controller.canvas.height=window.innerHeight
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
    //Render the scene
    controller.scene.Render(ctx);
}

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal_close');

closeModal.addEventListener('click', (e)=>{
    modal.classList.remove('modal--show');
})