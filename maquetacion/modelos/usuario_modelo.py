import hashlib
from conexion_db import obtener_conexion

def verificar_usuario(usuario, contrasena):
    # Encriptar la contraseña ingresada
    contrasena_encriptada = hashlib.sha256(contrasena.encode()).hexdigest()
    
    conexion = obtener_conexion()
    cursor = conexion.cursor()

    # Consulta para buscar el usuario con la contraseña encriptada
    query = """
        SELECT u.id, u.nombre, r.nombre
        FROM usuarios u
        JOIN roles r ON u.rol_id = r.id
        WHERE u.email = %s AND u.password = %s
    """
    cursor.execute(query, (usuario, contrasena_encriptada))
    usuario_encontrado = cursor.fetchone()
    conexion.close()

    return usuario_encontrado  # Devuelve el usuario encontrado o None si no lo encuentra
