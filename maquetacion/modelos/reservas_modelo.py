from conexion_db import obtener_conexion

def guardar_reserva(cliente_id, paquete_id, fecha_reserva, total, estado):
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    # Consulta para insertar la reserva
    query = """
        INSERT INTO reservas (cliente_id, paquete_id, fecha_reserva, total, estado)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (cliente_id, paquete_id, fecha_reserva, total, estado))
    conexion.commit()
    conexion.close()