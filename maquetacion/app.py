from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from controladores.usuario_controlador import login_controlador
from controladores.promocion_controlador import home_controlador, obtener_promociones_api
from controladores.paquete_controlador import filtrar_paquetes_controlador
from controladores.adquirir_paquete_controlador import adquirir_paquete_controlador
from controladores.reservas_controlador import guardar_reserva_controlador
from flask_cors import CORS


app = Flask(__name__, template_folder='templates', static_folder='static')
CORS(app)
app.secret_key = '12345'

@app.route('/login', methods=['GET', 'POST'])
def login():
    return login_controlador()

@app.route('/home')
def home():
    return home_controlador()

@app.route('/api/promociones', methods=['GET'])
def promociones_api():
    return obtener_promociones_api()  

@app.route('/api/paquetes/filtrar', methods=['POST'])
def filtrar_paquetes():
    return filtrar_paquetes_controlador()

@app.route('/adquirir', methods=['POST'])
def adquirir_paquete():
    return adquirir_paquete_controlador()

@app.route('/pagos')
def pagos():
    return render_template('pagos.html') 

@app.route('/guardar_reserva', methods=['POST'])
def guardar_reserva():
    return guardar_reserva_controlador()

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada correctamente"}), 200


@app.after_request
def agregar_cabeceras_no_cache(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

if __name__ == "__main__":
    app.run(debug=True)
