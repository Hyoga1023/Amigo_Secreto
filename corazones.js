
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.className = "corazon";
  corazon.textContent = "❤";
  
  corazon.style.left = Math.random() * window.innerWidth + "px";
  corazon.style.fontSize = Math.random() * 70 + 10 + "px";
  corazon.style.opacity = Math.random() * 0.5 + 0.3;
  
  document.body.appendChild(corazon);


  setTimeout(() => corazon.remove(), 4000);
}

setInterval(crearCorazon, 150);
