# modelos/promocion_modelo.py
from conexion_db import obtener_conexion

def obtener_promociones_limitadas(limit=3):
    # Conectar a la base de datos y obtener las promociones
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT nombre, descuento FROM promociones ORDER BY id ASC LIMIT %s", (limit,))
    promociones = cursor.fetchall()
    conexion.close()
    return promociones
