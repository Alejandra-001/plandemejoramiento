from conexion_db import obtener_conexion

def guardar_reserva(cliente_id, paquete_id, fecha_reserva, total, estado, num_personas):
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    query = """
        INSERT INTO reservas (cliente_id, paquete_id, fecha_reserva, total, estado, num_personas)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(query, (cliente_id, paquete_id, fecha_reserva, total, estado, num_personas))
    conexion.commit()
    conexion.close()

def descontar_asientos(paquete_id, num_personas):
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    try:
        # Obtener vuelo asociado al paquete
        query = """
            SELECT v.id, v.asientos_disponibles
            FROM vuelos v
            INNER JOIN paquetes p ON p.vuelo_id = v.id
            WHERE p.id = %s
        """
        cursor.execute(query, (paquete_id,))
        vuelo = cursor.fetchone()

        if vuelo:
            vuelo_id = vuelo[0]
            asientos_disponibles = vuelo[1]

            if asientos_disponibles >= num_personas:
                nuevos_asientos = asientos_disponibles - num_personas
                update_query = """
                    UPDATE vuelos
                    SET asientos_disponibles = %s
                    WHERE id = %s
                """
                cursor.execute(update_query, (nuevos_asientos, vuelo_id))
                conexion.commit()
            else:
                raise ValueError("No hay suficientes asientos disponibles para esta reserva.")
    except Exception as e:
        print("Error al descontar asientos:", str(e))
        raise e
    finally:
        conexion.close()
