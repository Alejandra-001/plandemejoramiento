# modelo/usuario_modelo.py

import hashlib
from conexion_db import obtener_conexion

def verificar_usuario(usuario, contrasena):
    # Encriptar la contraseña
    contrasena_encriptada = hashlib.sha256(contrasena.encode()).hexdigest()

    # Conectar a la base de datos
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    # Consultar al usuario en la base de datos
    query = "SELECT u.id, u.nombre, r.nombre FROM usuarios u JOIN roles r ON u.rol_id = r.id WHERE u.email = %s AND u.password = %s"
    cursor.execute(query, (usuario, contrasena_encriptada))
    
    # Obtener el usuario
    usuario_encontrado = cursor.fetchone()
    conexion.close()

    if usuario_encontrado:
        return usuario_encontrado  # Devuelve (id, nombre, rol)
    return None
