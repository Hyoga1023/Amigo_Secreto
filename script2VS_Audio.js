document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("jigsaw-audio");
    audio.volume = 1.0;

    setTimeout(() => {
      audio.play().catch(err => {
        console.warn("El navegador bloqueó el autoplay del audio:", err);
      });
    }, 1000);
});