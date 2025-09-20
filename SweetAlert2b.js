// Configura los colores que usas en tu proyecto
const backgroundColor = "#000000";    // fondo oscuro
const textColor = "#EAD196";          // texto dorado
const buttonColor = "#BF3131";        // rojo

function mostrarError() {
  Swal.fire({
    title: "Respuesta incorrecta",
    text: "No es la respuesta correcta… tu vida está en juego. Intenta de nuevo.",
    background: backgroundColor,
    color: textColor,
    confirmButtonColor: buttonColor,
    allowOutsideClick: false,
    allowEscapeKey: false
  });
}
