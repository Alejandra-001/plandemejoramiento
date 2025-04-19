from flask import request, jsonify
from modelos.paquete_modelo import filtrar_paquetes

def filtrar_paquetes_controlador():
    datos = request.get_json()
    paquetes = filtrar_paquetes(
        origen=datos['origen'],
        destino=datos['destino'],
        personas=int(datos['personas']),
        fecha=datos['fecha'],
        precio=float(datos['precio'])
    )
    return jsonify(paquetes)
