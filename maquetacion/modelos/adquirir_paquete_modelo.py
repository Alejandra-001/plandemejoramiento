from conexion_db import obtener_conexion

def registrar_adquisicion(paquete, num_personas):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute(
            "INSERT INTO adquisiciones (paquete_id, num_personas) VALUES (%s, %s)",
            (paquete['id'], num_personas)
        )
    conexion.commit()
    conexion.close()
