document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("saw-theme");

  setTimeout(() => {
    music.volume = 0.4;
    music.play().catch(err => {
      console.warn("El navegador bloqueó el autoplay del audio:", err);

    });
  }, 500);
});
