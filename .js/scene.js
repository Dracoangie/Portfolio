class Scene{

    constructor(){
        this.intBar = [];
        this.intGallery = [];
        this.intRoom = [];
        this.intCinema = [];
    }

    Start()
    {
        this.intBar.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,40,40,"Bar"))
        this.intGallery.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,100,100,"ArtGallery"))
        this.intRoom.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,20,20,"Room"))
        this.intCinema.push(new interactable(controller.canvas.width / 2,controller.canvas.height / 2,60,60,"Cinema"))
        map.Start(this.intBar,this.intGallery,this.intRoom,this.intCinema)
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

const cinemaModal = document.querySelector('.Cinema_Modal');
const artGalleryModal = document.querySelector('.ArtGallery_Modal');
const roomModal = document.querySelector('.Room_Modal');
const barModal = document.querySelector('.bar_modal');
// Selecciona todos los botones con la clase .modal_close
const closeButtons = document.querySelectorAll('.modal_close');

// Añade un evento click a cada botón
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Evita el comportamiento por defecto del enlace
        e.preventDefault();

        // Encuentra el modal contenedor más cercano y elimina la clase modal--show
        const modal = button.closest('.bar_modal, .ArtGallery_Modal, .Room_Modal, .Cinema_Modal');
        modal.classList.remove('modal--show');
    });
});