from flask import render_template, request
from modelos.usuario_modelo import verificar_usuario

def login_controlador():
    if request.method == 'POST':
        usuario = request.form['usuario']
        contrasena = request.form['contrasena']
        usuario_info = verificar_usuario(usuario, contrasena)

        if usuario_info:
            return render_template('home.html', nombre=usuario_info[1], rol=usuario_info[2])
        else:
            return render_template('login.html', error="Usuario o contraseña incorrectos.")
    return render_template('login.html')
