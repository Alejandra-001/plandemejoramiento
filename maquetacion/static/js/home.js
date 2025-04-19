// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  mostrarRolUsuario();
  configurarEventos();
  cargarPromociones();
});

// Mostrar el rol del usuario almacenado en localStorage
function mostrarRolUsuario() {
  const rol = localStorage.getItem('rol');
  if (rol) {
    const rolElemento = document.getElementById('usuario-rol');
    if (rolElemento) rolElemento.textContent = rol;
  }
}

// Configurar eventos: botón de búsqueda y cierre de sesión
function configurarEventos() {
  const btnBuscar = document.getElementById('btnBuscar');
  if (btnBuscar) {
    btnBuscar.addEventListener('click', buscarPaquetes);
  }

  const cerrarSesionBtn = document.getElementById('cerrar-sesion');
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', cerrarSesion);
  }
}

// Buscar paquetes o vuelos según los campos
function buscarPaquetes() {
  const origen = document.getElementById('campo1').value;
  const destino = document.getElementById('campo2').value;
  const personas = document.getElementById('campo3').value;
  const fecha = document.getElementById('campo4').value;
  const precio = document.getElementById('campo5').value;

  // Validación rápida
  if (!origen || !destino || !personas || !fecha || !precio) {
    alert("Por favor complete todos los campos.");
    return;
  }

  const filtros = { origen, destino, personas, fecha, precio };

  fetch('/api/paquetes/filtrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filtros)
  })
    .then(res => res.json())
    .then(mostrarResultados)
    .catch(err => console.error('Error:', err));
}

// Mostrar los resultados devueltos por el backend
function mostrarResultados(data) {
  const contenedor = document.getElementById('contenedorResultados');
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = '';

  if (data.length > 0) {
    contenedor.style.display = 'block';
    data.forEach(paquete => {
      resultados.innerHTML += `
        <div class="col-md-4 mb-4">
        <div class="card shadow-sm">
          <h5 class="card-header text-center">Paquete ${paquete.nombre}</h5>
          <div class="card-body">
            <p class="card-text"><strong>Descripción:</strong> ${paquete.descripcion}</p>
            <p class="card-text"><strong>Origen:</strong> ${paquete.origen_ciudad}</p>
            <p class="card-text"><strong>Destino:</strong> ${paquete.destino_ciudad}</p>
            <p class="card-text"><strong>Aerolínea:</strong> ${paquete.aerolinea}</p>
            <p class="card-text"><strong>Fecha:</strong> ${new Date(paquete.fecha).toLocaleDateString()}</p>
            <p class="card-text"><strong>Hora:</strong> ${paquete.hora_salida}</p>
            <p class="card-text"><strong>Precio:</strong> $${paquete.precio_total}</p>
            <div class="col-md-12 text-center">
              <a href="pagos" class=" col-md-7 btn btn-primary">Adquirir</a>
            </div>
          </div>
        </div>
      </div>
      `;
    });
  } else {
    resultados.innerHTML = '<p class="text-muted">No se encontraron resultados para tu busqueda.</p>';
    contenedor.style.display = 'block';
  }
}


// Cargar nombres de promociones (solo los primeros 3)
function cargarPromociones() {
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
    .catch(error => console.error('Error cargando promociones:', error));
}

// Cerrar sesión limpiando todo
function cerrarSesion(event) {
  event.preventDefault();

  // Limpiar almacenamiento local y de sesión
  localStorage.clear();
  sessionStorage.clear();

  // Borrar cookies
  document.cookie.split(";").forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  // Cierre de sesión backend
  fetch('/logout', { method: 'POST', headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      if (response.ok) {
        window.location.href = '/login';
      } else {
        console.error('Error al cerrar sesión');
      }
    })
    .catch(error => console.error('Error al cerrar sesión:', error));

  // Refuerzo de redirección
  setTimeout(() => {
    window.history.replaceState(null, '', window.location.href);
    window.location.href = '/login';
  }, 100);
}
