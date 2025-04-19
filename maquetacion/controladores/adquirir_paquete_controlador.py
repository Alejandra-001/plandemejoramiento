from flask import request, jsonify

def adquirir_paquete_controlador():
    data = request.get_json()

    id = data.get('id')
    paquete = data.get('paquete')
    descripcion = data.get('descripcion')
    origen = data.get('origen')
    destino = data.get('destino')
    fecha = data.get('fecha')
    aerolinea = data.get('aerolinea')
    precio = data.get('precio')
    numPersonas = data.get('numPersonas')

    # Aquí podrías validar los datos o incluso llamar a un modelo para registrar la compra si quieres.
    print("Adquisición recibida:", paquete, numPersonas)

    return jsonify({"success": True}), 200
