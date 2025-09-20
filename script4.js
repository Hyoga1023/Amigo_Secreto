document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombreInput");

  nombreInput.addEventListener("input", () => {
    const valor = nombreInput.value.trim().toLowerCase();

    if (valor === "cesar") {
      Swal.fire({
        title: "¡TERMINÓ EL JUEGO!",
        html: `
          <p style="color:#fff; font-size:1.2rem;">
            ¡Eres libre!<br><br>
            El código secreto de tu recompensa es:<br>
            <strong style="color:#ff0000; font-size:1.5rem;">0101010101</strong>
          </p>
        `,
        icon: "success",
        background: "#000",
        color: "#fff",
        confirmButtonText: "Salir",
        confirmButtonColor: "#ff0000",
        backdrop: "rgba(0,0,0,0.85)"
      }).then(() => {
        window.location.href = "https://www.google.com";
      });

      nombreInput.value = "";
      nombreInput.disabled = true;
    }
  });
});