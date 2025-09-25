document.addEventListener("DOMContentLoaded", () => {
  const validarCodigo = () => {
    Swal.fire({
      title: '🔒 Acceso restringido',
      text: 'Solo si tienes el código secreto podrás continuar',
      input: 'password',
      inputPlaceholder: 'Escribe tu código aquí',
      confirmButtonText: 'Entrar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      backdrop: 'rgba(0,0,0,0.95)',
      background: '#1b1b1b',
      color: '#fff',
      confirmButtonColor: '#c2185b'
    }).then(result => {
      if (result.isConfirmed && result.value === '9158') {
        Swal.fire({
          title: '¡Bienvenida Monica!',
          text: 'Acceso concedido. Recuerda subir el volumen',
          icon: 'success',
          backdrop: 'rgba(0,0,0,0.95)', 
          background: '#1b1b1b',
          color: '#fff',
          confirmButtonColor: '#c2185b'
        }).then(() => {
          document.body.classList.add("mostrar");
        });
      } else {
        Swal.fire({
          title: 'Código incorrecto',
          text: 'Ups… inténtalo de nuevo',
          icon: 'error',
          backdrop: 'rgba(0,0,0,0.95)',
          background: '#1b1b1b',
          color: '#fff',
          confirmButtonColor: '#c2185b'
        }).then(() => validarCodigo());
      }
    });
  };

  validarCodigo();
});

document.body.classList.add('mostrar');
