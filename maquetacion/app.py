from flask import Flask
from controladores.usuario_controlador import login_controlador

app = Flask(__name__, template_folder='templates')

@app.route('/login', methods=['GET', 'POST'])
def login():
    return login_controlador()

if __name__ == "__main__":
    app.run(debug=True)
