from conexion_db import obtener_conexion

from datetime import datetime

def filtrar_paquetes(origen, destino, personas, fecha, precio):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)

    query = """
        SELECT 
         p.id,
         p.nombre, 
         p.descripcion, 
         CAST(p.precio_total AS UNSIGNED) AS precio_total,
         v.fecha, 
         a.nombre AS aerolinea, 
         ao.ciudad AS origen_ciudad, 
         ad.ciudad AS destino_ciudad
     FROM paquetes p
     JOIN vuelos v ON v.id = p.vuelo_id
     JOIN aeropuertos ao ON ao.id = v.origen_id
     JOIN aeropuertos ad ON ad.id = v.destino_id
     JOIN aerolineas a ON a.id = v.aerolinea_id
     WHERE ao.ciudad = %s
       AND ad.ciudad = %s
       AND v.fecha >= %s
       AND v.asientos_disponibles >= %s
       AND p.precio_total <= %s
    """
    
    cursor.execute(query, (origen, destino, fecha, personas, precio))
    resultados = cursor.fetchall()

    # Convertir la fecha a formato de hora solo
    for resultado in resultados:
        fecha_vuelo = resultado['fecha']
        if fecha_vuelo:
            resultado['hora_salida'] = fecha_vuelo.strftime('%H:%M:%S')  # Formato hora: minutos:segundos

    conexion.close()
    return resultados
