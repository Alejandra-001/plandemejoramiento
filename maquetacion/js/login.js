document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const user = document.querySelector('input[type="text"]').value;
    const pass = document.querySelector('input[type="password"]').value;

    // Contraseña esperada
    const passCorrecta = 'aleja';

    if (pass !== passCorrecta) {
      // Usamos SweetAlert2 para el alert bonito
      Swal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        text: 'Por favor, intenta de nuevo.'
      });
    } else {
      // Aquí puedes redirigir o mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente.'
      });
    }
  })