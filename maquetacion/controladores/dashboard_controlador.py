from flask import jsonify
from modelos.dashboard_modelo import (
    obtener_ventas_totales,
    obtener_paquetes_mas_vendidos,
    obtener_ocupacion_vuelos,
    obtener_ocupacion_hoteles,
    obtener_promociones_activas
)

def obtener_dashboard():
    try:
        # Obtener datos del modelo
        ventas_totales = obtener_ventas_totales()
        paquetes_mas_vendidos = obtener_paquetes_mas_vendidos()
        ocupacion_vuelos = obtener_ocupacion_vuelos()
        ocupacion_hoteles = obtener_ocupacion_hoteles()
        promociones_activas = obtener_promociones_activas()

        # Asegúrate de que los datos no sean None o vacíos
        print(f"Ventas Totales: {ventas_totales}")
        print(f"Paquetes Más Vendidos: {paquetes_mas_vendidos}")
        print(f"Ocupación Vuelos: {ocupacion_vuelos}")
        print(f"Ocupación Hoteles: {ocupacion_hoteles}")
        print(f"Promociones Activas: {promociones_activas}")

        # Devolver los datos como respuesta JSON
        return jsonify({
            "ventas_totales": ventas_totales,
            "paquetes_mas_vendidos": paquetes_mas_vendidos,
            "ocupacion_vuelos": ocupacion_vuelos,
            "ocupacion_hoteles": ocupacion_hoteles,
            "promociones_activas": promociones_activas
        }), 200

    except Exception as e:
        # En caso de error, devolver mensaje de error
        return jsonify({"error": str(e)}), 500
