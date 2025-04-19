from flask import Flask, jsonify, render_template, session
from controladores.usuario_controlador import login_controlador
from controladores.promocion_controlador import home_controlador, obtener_promociones_api
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
    return obtener_promociones_api()  # Llamamos al controlador para obtener las promociones en formato JSON

@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada correctamente"}), 200

if __name__ == "__main__":
    app.run(debug=True)
