# controladores/promocion_controlador.py
from flask import jsonify, render_template
from modelos.promocio_modelo import obtener_promociones_limitadas

def home_controlador():
    promociones = obtener_promociones_limitadas(3)
    return render_template('home.html', promociones=promociones)

def obtener_promociones_api():
    promociones = obtener_promociones_limitadas(3)
    # Retornamos las promociones como un JSON
    return jsonify([{'nombre': promo[0], 'descuento': promo[1]} for promo in promociones])
