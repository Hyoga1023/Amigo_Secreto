document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("jigsaw-audio");
    const btn = document.getElementById("btn-empezar");

    // Verificar si el archivo existe antes de intentar reproducirlo
    audio.addEventListener('loadeddata', () => {
        console.log('Audio cargado correctamente');
    });
    
    audio.addEventListener('error', (e) => {
        console.error('Error cargando audio:', e);
        // Habilitar el botón aunque el audio falle
        btn.disabled = false;
        btn.classList.add("btn-activo");
    });

    const activar = sessionStorage.getItem("activarAudio");
    if (activar) {
        setTimeout(() => {
            audio.volume = 1;
            
            // Verificar si el audio se puede reproducir
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        audio.addEventListener("ended", () => {
                            btn.disabled = false;
                            btn.classList.add("btn-activo");
                        });
                    })
                    .catch(err => {
                        console.warn("El navegador bloqueó el autoplay:", err);
                        btn.disabled = false;
                        btn.classList.add("btn-activo");
                    });
            }
        }, 1000);

        sessionStorage.removeItem("activarAudio");
    } else {
        btn.disabled = false;
    }
});