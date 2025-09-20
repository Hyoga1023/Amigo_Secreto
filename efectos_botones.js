// script.js

function crearElementoFlotante(tipo, boton, color, contenido) {
  const elem = document.createElement("span");
  elem.textContent = contenido;
  elem.style.position = "absolute";
  elem.style.left = Math.random() * boton.offsetWidth + "px";
  elem.style.bottom = "0";
  elem.style.fontSize = Math.random() * 14 + 14 + "px";
  elem.style.color = color;
  elem.style.opacity = "0.8";
  elem.style.animation = `${tipo}-anim 2s linear forwards`;
  boton.appendChild(elem);

  setTimeout(() => elem.remove(), 2000);
}

function animar(bot, tipo) {
  setInterval(() => {
    if (tipo === "corazon") {
      crearElementoFlotante("corazon", bot, "red", "❤");
    } else {
      crearElementoFlotante("rayo", bot, "#ffcc00", "⚡");
    }
  }, 400);
}

window.addEventListener("DOMContentLoaded", () => {
  const lightBtn = document.getElementById("startButton1");
  const darkBtn = document.getElementById("startButton2");

  lightBtn.style.position = "relative";
  darkBtn.style.position = "relative";
  lightBtn.style.overflow = "hidden";
  darkBtn.style.overflow = "hidden";

  animar(lightBtn, "corazon");
  animar(darkBtn, "rayo");
});
