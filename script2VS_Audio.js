document.addEventListener("DOMContentLoaded", () => {
        const audio = document.getElementById("jigsaw-audio");
        const btn = document.getElementById("btn-empezar");

        // Solo reproducir si venimos del index con bandera
        const activar = sessionStorage.getItem("activarAudio");
        if (activar) {
          setTimeout(() => {
            audio.volume = 1;
            audio.play()
              .then(() => {
                // Desbloquear botón cuando el audio termine
                audio.addEventListener("ended", () => {
                  btn.disabled = false;
                  btn.classList.add("btn-activo"); // opcional, para estilo
                });
              })
              .catch(err => {
                console.warn("Autoplay bloqueado:", err);
                // Si falla autoplay, habilitamos el botón manualmente
                btn.disabled = false;
              });
          }, 1000); // ← delay de 1 segundo

          sessionStorage.removeItem("activarAudio");
        } else {
          // Si entran directo sin bandera, habilitamos el botón al tiro
          btn.disabled = false;
        }
      });