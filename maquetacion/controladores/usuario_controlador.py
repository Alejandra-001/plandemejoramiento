from flask import request, jsonify
from modelos.usuario_modelo import verificar_usuario

def login_controlador():
    if request.method == 'POST':
        # Intenta obtener desde JSON
        data = request.get_json(silent=True)
        
        if data:
            usuario = data.get('email')
            contrasena = data.get('password')
        else:
            # Fallback a formulario (HTML form)
            usuario = request.form.get('usuario')
            contrasena = request.form.get('contrasena')

        if not usuario or not contrasena:
            return jsonify({"error": "Email y contraseña son requeridos"}), 400

        usuario_info = verificar_usuario(usuario, contrasena)

        if usuario_info:
            return jsonify({
                "message": "Login exitoso",
                "id": usuario_info[0],
                "usuario": usuario_info[1],
                "rol": usuario_info[2]
            }), 200
        else:
            return jsonify({"error": "Usuario o contraseña incorrectos."}), 401

    return jsonify({"error": "Método no permitido"}), 405
