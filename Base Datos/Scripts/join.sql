-- Paquetes con su hotel y vuelo incluido
SELECT 
    paquetes.id,
    paquetes.nombre,
    hoteles.nombre,
    vuelos.id,
    vuelos.fecha
FROM paquetes
JOIN hoteles ON paquetes.hotel_id = hoteles.id
JOIN vuelos ON paquetes.vuelo_id = vuelos.id;

-- Reservas completas con información de cliente y paquete
SELECT 
    reservas.id,
    clientes.nombre,
    paquetes.nombre,
    reservas.fecha_reserva,
    reservas.total,
    reservas.estado
FROM reservas
JOIN clientes ON reservas.cliente_id = clientes.id
JOIN paquetes ON reservas.paquete_id = paquetes.id;

-- Vuelos con información de aerolínea y aeropuertos
SELECT 
    vuelos.id,
    aerolineas.nombre,
    aeropuerto_origen.nombre,
    aeropuerto_destino.nombre,
    vuelos.fecha,
    vuelos.asientos_disponibles,
    vuelos.precio
FROM vuelos
JOIN aerolineas ON vuelos.aerolinea_id = aerolineas.id
JOIN aeropuertos AS aeropuerto_origen ON vuelos.origen_id = aeropuerto_origen.id
JOIN aeropuertos AS aeropuerto_destino ON vuelos.destino_id = aeropuerto_destino.id;

-- Promociones aplicables a paquetes específicos
SELECT 
    promociones.nombre,
    promociones.descuento,
    promociones.fecha_inicio,
    promociones.fecha_fin,
    paquetes.nombre
FROM promociones
JOIN paquetes ON promociones.paquete_id = paquetes.id;

-- Habitaciones reservadas con información de hotel y cliente
SELECT 
    reserva_habitaciones.id,
    hoteles.nombre,
    habitaciones.numero,
    clientes.nombre,
    reserva_habitaciones.fecha_entrada,
    reserva_habitaciones.fecha_salida
FROM reserva_habitaciones
JOIN habitaciones ON reserva_habitaciones.habitacion_id = habitaciones.id
JOIN hoteles ON habitaciones.hotel_id = hoteles.id
JOIN reservas ON reserva_habitaciones.reserva_id = reservas.id
JOIN clientes ON reservas.cliente_id = clientes.id;
