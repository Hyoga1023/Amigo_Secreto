// musica.js
window.addEventListener("DOMContentLoaded", () => {
  const AUDIO_PATH = "audios/musica_instrumental_para_ninos_felices.mp3";
  let audioEl = document.getElementById("musica");

  // Si no existe en el HTML, lo creamos (por si quieres mantener todo en JS)
  if (!audioEl) {
    audioEl = new Audio(AUDIO_PATH);
    audioEl.id = "musica";
    audioEl.preload = "auto";
    audioEl.loop = true;
    document.body.appendChild(audioEl);
  } else {
    // Aseguramos que la src sea la correcta (evita confusiones)
    if (!audioEl.src || !audioEl.src.includes("musica_instrumental_para_ninos_felices.mp3")) {
      audioEl.src = AUDIO_PATH;
    }
  }

  audioEl.loop = true;
  audioEl.volume = 0.5; // ajusta entre 0.0 y 1.0

  // Intento de autoplay. Si falla, se configura el listener de interacción.
  const intentarReproducir = () => {
    audioEl.play().then(() => {
      console.log("Reproduciendo música de fondo.");
    }).catch((err) => {
      console.warn("Autoplay bloqueado por el navegador:", err);
      // arrancar en primer gesto del usuario: pointerdown (mouse/touch), keydown
      const iniciarPorUsuario = () => {
        audioEl.play().catch(e => console.error("No se pudo reproducir tras interacción:", e));
        quitarListeners();
      };

      function quitarListeners() {
        window.removeEventListener("pointerdown", iniciarPorUsuario);
        window.removeEventListener("touchstart", iniciarPorUsuario);
        window.removeEventListener("keydown", iniciarPorUsuario);
      }

      window.addEventListener("pointerdown", iniciarPorUsuario, { once: true });
      window.addEventListener("touchstart", iniciarPorUsuario, { once: true });
      window.addEventListener("keydown", iniciarPorUsuario, { once: true });
    });
  };

  // Ejecutamos el intento inicial
  intentarReproducir();

  // Para debug: si hay error de carga (404 etc.)
  audioEl.addEventListener("error", (e) => {
    console.error("Error cargando el audio. Revisa ruta y nombre del archivo. Detalle:", e);
  });
});
