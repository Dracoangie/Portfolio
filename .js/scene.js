class Scene{

    constructor(){
        this.intGallery = [];
        this.bar = [];
    }

    Start()
    {
        this.bar.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,40,40,"Cinema"))
        this.intGallery.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,100,100,"ArtGallery"))
        map.Start(this.intGallery,this.bar)
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

//----- css connections -----

const modal = document.querySelector('.modal');
const artGallery = document.querySelector('.ArtGallery');
// Selecciona todos los botones con la clase .modal_close
const closeButtons = document.querySelectorAll('.modal_close');

// Añade un evento click a cada botón
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Evita el comportamiento por defecto del enlace
        e.preventDefault();

        // Encuentra el modal contenedor más cercano y elimina la clase modal--show
        const modal = button.closest('.modal, .ArtGallery');
        modal.classList.remove('modal--show');
    });
});