from flask import request, jsonify
from modelos.reservas_modelo import guardar_reserva, descontar_asientos

def guardar_reserva_controlador():
    try:
        data = request.get_json()
        print(data)

        cliente_id = data['cliente_id']
        paquete_id = data['paquete_id']
        fecha_reserva = data['fecha_reserva']
        total = data['total']
        estado = data['estado']
        num_personas = int(data.get('num_personas', 0))  # Este dato debe venir del localStorage

        guardar_reserva(cliente_id, paquete_id, fecha_reserva, total, estado, num_personas)

        # Solo si el estado es "pagado", descontamos los asientos
        if estado.lower() == 'pagado' and num_personas > 0:
            descontar_asientos(paquete_id, num_personas)

        return jsonify({"message": "Reserva guardada correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
