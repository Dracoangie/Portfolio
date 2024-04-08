class Scene{

    constructor(){
    }

    Start()
    {
        map.Start();
        player.Start();
        camera.Start();
    }

    Update(deltaTime)
    {
        player.Update(deltaTime);
        map.Update();
        camera.Update();
    }
    Render(ctx)
    {
        ctx.save();
        
        camera.Draw(ctx);
        map.Draw(ctx, this.camera);
        player.Draw(ctx);

        ctx.restore();
    }

}