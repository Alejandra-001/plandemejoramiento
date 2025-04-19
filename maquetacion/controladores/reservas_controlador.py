from flask import request, jsonify
from modelos.reservas_modelo import guardar_reserva

def guardar_reserva_controlador():
    try:
        # Obtener los datos enviados en el body de la solicitud
        data = request.get_json()

        print(data)

        cliente_id = data['cliente_id']
        paquete_id = data['paquete_id']
        fecha_reserva = data['fecha_reserva']
        total = data['total']
        estado = data['estado']

        # Llamar al modelo para guardar la reserva
        guardar_reserva(cliente_id, paquete_id, fecha_reserva, total, estado)

        return jsonify({"message": "Reserva guardada correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
