document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const usuariosPermitidos = ['admin', 'aleja', 'juan']; // Usuarios de ejemplo

  form.addEventListener('submit', function (event) {
    const user = document.querySelector('input[name="usuario"]').value;
    const pass = document.querySelector('input[name="contrasena"]').value;

    const passCorrecta = 'aleja'; // Simulado

    // Verificación básica de usuario
    if (!usuariosPermitidos.includes(user)) {
      event.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Usuario no registrado',
        text: 'El usuario ingresado no se encuentra en la base de datos.'
      });
      return;
    }

    // Verificación de contraseña simulada
    if (pass !== passCorrecta) {
      event.preventDefault();
      Swal.fire({
        icon: 'error',
        title: 'Contraseña incorrecta',
        text: 'Por favor, intenta de nuevo.'
      });
    } else {
      // Usuario y contraseña correctos
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Has iniciado sesión correctamente.'
      });
      // Si quieres detener también aquí para pruebas:
      // event.preventDefault();
    }
  });

  // Ocultar mensaje del backend después de 4 segundos
  const errorAlert = document.getElementById('error-alert');
  if (errorAlert) {
    setTimeout(() => {
      errorAlert.style.display = 'none';
    }, 4000); // 4000 ms = 4 segundos
  }
});
