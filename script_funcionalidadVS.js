document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("jigsaw-audio");
  const btn = document.getElementById("btn-empezar");

  // Reproducir el audio 1s después de cargar
  setTimeout(() => {
    audio.play().catch(err => {
      console.warn("El navegador bloqueó el autoplay:", err);
    });
  }, 1000);

  // Cuando el audio termina, mostrar el botón
  audio.addEventListener("ended", () => {
    btn.classList.add("visible");
  });
});
