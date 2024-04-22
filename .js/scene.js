class Scene{

    constructor(){
        this.cube = new interactable(controller.canvas.width / 2,controller.canvas.height / 2,40,40);
    }

    Start()
    {
        map.Start()
        player.Start();
        camera.Start();
    }

    Update(deltaTime)
    {
        player.Update(deltaTime);
        
        map.Update();
        this.cube.Update();
        camera.Update();
    }
    Render(ctx)
    {
        ctx.save();
        
        camera.Draw(ctx);
        map.Draw(ctx, this.camera);
        player.Draw(ctx);

        
        this.cube.Draw(ctx);
        ctx.restore();
    }

}