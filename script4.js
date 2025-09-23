document.addEventListener("DOMContentLoaded", () => {
  const nombreInput = document.getElementById("nombreInput");
  const validarBtn = document.getElementById("validarNombre");

  validarBtn.addEventListener("click", () => {
    const valor = nombreInput.value.trim().toLowerCase();

    if (valor === "cesar") {
      Swal.fire({
        title: "¡TERMINÓ EL JUEGO!",
        html: `
          <p style="color:var(--color-4); font-size:1.2rem;">
            Eres libre!<br><br>
            El código de tu recompensa es:<br>
            <strong style="color:var(--color-2); font-size:1.5rem;">8718383764650</strong><br>
            Crepes & Waffles te espera<br>
            con un delicioso premio.
          </p>
        `,
        icon: "success",
        background: "#000",
        color: "var(--color-4)",
        confirmButtonText: "Salir",
        confirmButtonColor: "var(--color-2)",
        backdrop: "rgba(0,0,0,0.85)"
      }).then(() => {
        window.location.href = "https://www.google.com";
      });
      nombreInput.value = "";
      nombreInput.disabled = true;
      validarBtn.disabled = true;
    } else {
      Swal.fire({
        title: "❌ Fallaste",
        text: "No es el nombre de tu amigo secreto",
        icon: "error",
        background: "#000",
        color: "var(--color-4)",
        confirmButtonColor: "var(--color-2)"
      });
    }
  });
});
