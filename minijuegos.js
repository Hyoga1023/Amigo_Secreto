class JuegoPruebas {
    constructor() {
        this.letras = ["S", "R", "A"];
        this.letrasObtenidas = [];
        this.juegoActual = 0;
        this.tiempoLimite = 60000; // 60s
        this.init();
    }

    init() {
        const startButton = document.getElementById('startGame');
        if (!startButton) {
            console.error("No se encontró el botón #startGame");
            return;
        }
        startButton.addEventListener('click', () => this.comenzarPruebas());
    }

    comenzarPruebas() {
        document.getElementById('intro').style.display = 'none';
        document.getElementById('progress').style.display = 'block';
        this.letrasObtenidas = [];
        this.juegoActual = 0;
        this.siguientePrueba();
    }

    siguientePrueba() {
        if (this.juegoActual < 3) {
            document.getElementById('juegoActual').textContent = this.juegoActual + 1;
            this.actualizarLetrasDisplay();

            Swal.fire({
                title: `PRUEBA ${this.juegoActual + 1}`,
                text: 'Preparándose para iniciar...',
                timer: 2000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
                background: 'linear-gradient(145deg, rgba(125,10,10,0.95), rgba(0,0,0,0.95))',
                color: '#EEEEEE'
            }).then(() => {
                switch (this.juegoActual) {
                    case 0: this.pruebaNumero(); break;
                    case 1: this.pruebaMemoria(); break;
                    case 2: this.pruebaReflexos(); break;
                }
            });
        } else {
            this.mostrarVictoria();
        }
    }

    actualizarLetrasDisplay() {
        const display = document.getElementById('letrasObtenidas');
        display.textContent = `LETRAS OBTENIDAS: ${this.letrasObtenidas.join(' - ')}`;
    }

    // ---- TIMER CON MILISEGUNDOS ----
    mostrarTimer(callback) {
        let tiempoRestante = this.tiempoLimite;
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer-display';
        document.body.appendChild(timerDiv);

        const updateTimer = () => {
            const seg = Math.floor(tiempoRestante / 1000);
            const ms = Math.floor((tiempoRestante % 1000) / 10);
            timerDiv.textContent = `TIEMPO: ${seg}.${ms.toString().padStart(2, '0')}`;
        };

        updateTimer();

        const interval = setInterval(() => {
            tiempoRestante -= 10;
            updateTimer();

            if (tiempoRestante <= 10000) {
                timerDiv.classList.add('timer-warning');
            }

            if (tiempoRestante <= 0) {
                clearInterval(interval);
                timerDiv.remove();
                callback(false);
            }
        }, 10);

        return () => {
            clearInterval(interval);
            timerDiv.remove();
        };
    }

    fallarPrueba(mensaje) {
        Swal.fire({
            icon: 'error',
            title: 'FALLO FATAL',
            html: `<div class="glitch-text">${mensaje}</div><br><strong>Regresando al inicio...</strong>`,
            confirmButtonText: 'REINTENTAR',
            allowOutsideClick: false,
            background: 'linear-gradient(145deg, rgba(139,0,0,0.95), rgba(0,0,0,0.95))',
            color: '#EEEEEE'
        }).then(() => this.comenzarPruebas());
    }

    // ---- PRUEBA 1: NÚMERO ----
    pruebaNumero() {
        const numeroSecreto = Math.floor(Math.random() * 20) + 1;
        let intentos = 0;
        const maxIntentos = 5;

        const limpiarTimer = this.mostrarTimer((exito) => {
            if (!exito) this.fallarPrueba(`Tiempo agotado. El número era ${numeroSecreto}`);
        });

        const preguntar = () => {
            Swal.fire({
                title: `DESCIFRAR CÓDIGO Oportunidades (${intentos + 1}/${maxIntentos})`,
                text: 'Adivina el número entre 1 y 20',
                input: 'number',
                inputAttributes: { min: 1, max: 20 },
                confirmButtonText: 'VERIFICAR',
                allowOutsideClick: false,
                inputValidator: v => (!v || v < 1 || v > 20) && 'Número válido requerido'
            }).then(res => {
                if (res.isConfirmed) {
                    intentos++;
                    const n = parseInt(res.value);
                    if (n === numeroSecreto) {
                        limpiarTimer();
                        this.pruebaCompletada("Código descifrado correctamente");
                    } else if (intentos >= maxIntentos) {
                        limpiarTimer();
                        this.fallarPrueba(`Código incorrecto. Era ${numeroSecreto}`);
                    } else {
                        Swal.fire({
                            title: n < numeroSecreto ? 'MUY BAJO' : 'MUY ALTO',
                            text: `Intentos restantes: ${maxIntentos - intentos}`,
                            timer: 1500,
                            showConfirmButton: false,
                            background: 'linear-gradient(145deg, rgba(125,10,10,0.95), rgba(0,0,0,0.95))',
                            color: '#EEEEEE'
                        }).then(() => preguntar());
                    }
                }
            });
        };
        preguntar();
    }

    // ---- PRUEBA 2: MEMORIA ----
    pruebaMemoria() {
        const colores = ['rojo', 'gris', 'blanco', 'negro'];
        const secuencia = Array.from({ length: 5 }, () => colores[Math.floor(Math.random() * colores.length)]);
        const limpiarTimer = this.mostrarTimer((exito) => {
            if (!exito) this.fallarPrueba('No memorizaste la secuencia a tiempo');
        });

        Swal.fire({
            title: 'MEMORIZAR SECUENCIA',
            html: `
                <div class="sequence-display">
                    ${secuencia.map(c => `<div class="color-box ${c}">${c.toUpperCase()}</div>`).join('')}
                </div>
                <p style="margin-top:15px;color:#EAD196;">Tienes 6 segundos para memorizar...</p>`,
            timer: 6000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false
        }).then(() => {
            Swal.fire({
                title: 'REPRODUCIR SECUENCIA',
                input: 'text',
                inputPlaceholder: 'rojo,gris,blanco...',
                confirmButtonText: 'VERIFICAR',
                allowOutsideClick: false,
                inputValidator: value => {
                    if (!value) return 'Debes escribir la secuencia separados por comas';
                    const r = value.toLowerCase().split(',').map(s => s.trim());
                    if (r.length !== 5) return 'Deben ser exactamente 5 colores y separarlos con comas';
                    const ok = r.every((c, i) => c === secuencia[i]);
                    if (ok) {
                        limpiarTimer();
                        setTimeout(() => this.pruebaCompletada("Secuencia memorizada correctamente"), 100);
                        return false;
                    }
                    limpiarTimer();
                    setTimeout(() => this.fallarPrueba(`Secuencia incorrecta. Era: ${secuencia.join(', ')}`), 100);
                    return 'Secuencia incorrecta';
                }
            });
        });
    }

    // ---- PRUEBA 3: REFLEJOS ----
    pruebaReflexos() {
        let clicks = 0;
        const targetClicks = 20;
        const objetivos = [];
        const limpiarTimer = this.mostrarTimer((exito) => {
            if (!exito) {
                objetivos.forEach(o => o.remove());
                this.fallarPrueba(`Solo conseguiste ${clicks}/${targetClicks} objetivos`);
            }
        });

        const crear = () => {
            const obj = document.createElement('div');
            obj.className = 'click-target';
            obj.textContent = clicks + 1;
            obj.style.left = Math.random() * (window.innerWidth - 70) + 'px';
            obj.style.top = Math.random() * (window.innerHeight - 70) + 'px';

            obj.addEventListener('click', () => {
                clicks++;
                obj.remove();
                if (clicks >= targetClicks) {
                    limpiarTimer();
                    objetivos.forEach(o => o.remove());
                    this.pruebaCompletada("Reflejos verificados correctamente");
                } else {
                    setTimeout(() => crear(), 200);
                }
            });

            document.body.appendChild(obj);
            objetivos.push(obj);
            setTimeout(() => { if (obj.parentNode) { obj.remove(); crear(); } }, 2500);
        };

        Swal.fire({
            title: 'PRUEBA DE REFLEJOS',
            text: `Elimina ${targetClicks} objetivos antes del tiempo límite`,
            confirmButtonText: 'COMENZAR',
            allowOutsideClick: false
        }).then(() => crear());
    }

    // ---- FINAL ----
    pruebaCompletada(msg) {
        this.letrasObtenidas.push(this.letras[this.juegoActual]);
        Swal.fire({
            icon: 'success',
            title: 'PRUEBA SUPERADA',
            text: `${msg}. Letra liberada: ${this.letras[this.juegoActual]}`,
            confirmButtonText: 'SIGUIENTE',
            background: 'linear-gradient(145deg, rgba(0,100,0,0.8), rgba(0,0,0,0.95))',
            color: '#EEEEEE'
        }).then(() => {
            this.juegoActual++;
            this.siguientePrueba();
        });
    }

    mostrarVictoria() {
        document.getElementById('progress').style.display = 'none';
        document.getElementById('final').style.display = 'block';
        document.getElementById('letrasFinales').textContent = this.letrasObtenidas.join(' - ');
    }
}

document.addEventListener('DOMContentLoaded', () => new JuegoPruebas());
