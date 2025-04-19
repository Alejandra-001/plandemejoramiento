// Al cargar la página, mostrar el rol si está en localStorage
document.addEventListener('DOMContentLoaded', function () {
    const rol = localStorage.getItem('rol');
    if (rol) {
      document.getElementById('usuario-rol').textContent = rol;
    }
  });

  // Cargar promociones dinámicamente
  fetch('/api/promociones')
  .then(response => response.json())
  .then(promociones => {
    promociones.slice(0, 3).forEach((promo, index) => {
      const titulo = document.getElementById(`promo-title-${index + 1}`);
      if (titulo) {
        titulo.textContent = promo.nombre;
      }
    });
  })
  .catch(error => console.error('Error cargando nombres de promociones:', error));
  
  // Cerrar sesión
  document.getElementById('cerrar-sesion').addEventListener('click', function (event) {
    event.preventDefault();
  
    // Limpiar localStorage, sessionStorage
    localStorage.clear();
    sessionStorage.clear();
  
    // Borrar todas las cookies accesibles desde JS
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  
    // Hacer logout desde backend
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Redirigir a login después de cerrar sesión
          window.location.href = '/login';
        } else {
          console.error('Error al cerrar sesión');
        }
      })
      .catch(error => {
        console.error('Error al cerrar sesión:', error);
      });
  
    // Redirigir a login y asegurarse de que no se pueda ir atrás
    setTimeout(function () {
      // Borrar el historial
      window.history.replaceState(null, '', window.location.href);
      // Redirigir inmediatamente a la página de login
      window.location.href = '/login';
    }, 100);  // Se coloca un pequeño retraso para asegurar que la redirección ocurra correctamente
  });
  