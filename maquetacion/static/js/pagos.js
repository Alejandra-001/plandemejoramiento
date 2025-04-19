document.addEventListener('DOMContentLoaded', function () {
  const paquete = JSON.parse(localStorage.getItem('paquete'));
  const numPersonas = localStorage.getItem('numPersonas');
  const clienteId = localStorage.getItem('id');  // Obtener cliente_id desde localStorage
  const paqueteId = paquete.id;  // Obtener paquete_id desde localStorage
  const num_personas = localStorage.getItem('num');
    const precio = parseFloat(paquete.precio);
    const impuesto = precio * 0.16;
    const totalConImpuesto = precio + impuesto;


  if (paquete && numPersonas) {
    

    const infoPaquete = `  
      <div class="mt-2"><strong>Descripción: <br></strong> <span class="text-secondary">${paquete.descripcion}</span></div>
      <div class="mt-2"><strong>Número de viajeros:</strong> <span class="text-secondary">${numPersonas}</span></div>
      <div class="mt-2"><strong>Origen:</strong> <span class="text-secondary">${paquete.origen}</span></div>
      <div class="mt-2"><strong>Destino:</strong> <span class="text-secondary">${paquete.destino}</span></div>
      <div class="mt-2"><strong>Aerolínea:</strong> <span class="text-secondary">${paquete.aerolinea}</span></div>
      <div class="mt-2"><strong>Fecha:</strong> <span class="text-secondary">${paquete.fecha}</span></div>
      <div class="mt-2"><strong>Precio:</strong> <span class="text-secondary">$${precio.toLocaleString()}</span></div>
    `;

    const totalTexto = `  
      <div class="mt-2"><strong>Total a pagar (16% IVA incluido):</strong><span class="d-flex justify-content-center mt-3 h1 fw-bold">$${totalConImpuesto.toLocaleString()}</span></div>
    `;

    document.getElementById('campo8').innerHTML = infoPaquete;
    document.getElementById('campo9').innerHTML = totalTexto;
  }

  // Botón cancelar
  document.getElementById('cancelarBtn').addEventListener('click', function () {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Se cancelará el proceso y se eliminarán los datos.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const fechaReserva = new Date().toISOString().slice(0, 10); // Fecha actual en formato 'YYYY-MM-DD'
        const estadoReserva = 'cancelado'; // Estado 'cancelado'

        console.log("Datos enviados al backend:", {
          cliente_id: clienteId,
          paquete_id: paqueteId,
          fecha_reserva: fechaReserva,
          total: totalConImpuesto,
          estado: estadoReserva
        });

        // Realizar la solicitud POST para guardar la reserva en el backend
        fetch('/guardar_reserva', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cliente_id: clienteId,
            paquete_id: paqueteId,
            fecha_reserva: fechaReserva,
            total: totalConImpuesto,
            estado: estadoReserva
          })
          
        })
        .then(response => response.json())
        .then(data => {
          console.log('Reserva cancelada guardada:', data);
        })
        .catch(error => {
          console.error('Error al guardar la reserva:', error);
        });

        localStorage.removeItem('paquete');
        localStorage.removeItem('numPersonas');
        localStorage.removeItem('voucher');
        // window.location.href = '/home';
      }
    });
  });

  // Botón Confirmar y Pagar
  document.getElementById('confirmarBtn').addEventListener('click', function () {
    // Mostrar spinner
    new bootstrap.Modal(document.getElementById('spinnerModal')).show();

    setTimeout(function () {
      bootstrap.Modal.getInstance(document.getElementById('spinnerModal')).hide();

      // Mostrar Swal (pago exitoso)
      Swal.fire({
        icon: 'success',
        title: 'Pago exitoso',
        text: 'Su pago ha sido procesado exitosamente.',
        confirmButtonText: 'OK'
      }).then(() => {
        // Mostrar voucher después de hacer clic en OK
        document.getElementById("voucherNombre").textContent = document.getElementById("campo1").value;
        document.getElementById("voucherCorreo").textContent = document.getElementById("campo4").value;
        document.getElementById("voucherDireccion").textContent = document.getElementById("campo5").value;
        document.getElementById("voucherCiudad").textContent = document.getElementById("campo6").value;
        document.getElementById("voucherPaquete").textContent = paquete.descripcion;
        document.getElementById("voucherMonto").textContent = `$${(paquete.precio * 1.16).toLocaleString()}`;
        document.getElementById("voucherFecha").textContent = new Date().toLocaleString();

        new bootstrap.Modal(document.getElementById('modalVoucher')).show();

        const fechaReserva = new Date().toISOString().slice(0, 10); // Fecha actual en formato 'YYYY-MM-DD'
        const estadoReserva = 'pagado'; // Estado 'pagado'

        // Realizar la solicitud POST para guardar la reserva en el backend
        fetch('/guardar_reserva', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cliente_id: clienteId,
            paquete_id: paqueteId,
            fecha_reserva: fechaReserva,
            total: totalConImpuesto,
            estado: estadoReserva,
            num_personas: numPersonas
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Reserva pagada guardada:', data);
        })
        .catch(error => {
          console.error('Error al guardar la reserva:', error);
        });

        // Limpiar localStorage
        localStorage.removeItem('paquete');
        localStorage.removeItem('numPersonas');
        localStorage.removeItem('voucher');
      });

    }, 4000); // Fin del spinner
  });

  // Opcional: redirigir al cerrar el modal del voucher
  const modalVoucher = document.getElementById('modalVoucher');
  modalVoucher.addEventListener('hidden.bs.modal', function () {
    window.location.href = '/home';
  });
});
