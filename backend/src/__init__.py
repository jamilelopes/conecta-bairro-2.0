# onde a aplicação é criada (factory)
#ex:

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, static_folder='../static', static_url_path='/static')
    app.config.from_object(Config)

    db.init_app(app)
    
    # Configurar CORS para permitir requisições do frontend
    CORS(app, 
         origins=['http://localhost:5000', 'http://localhost:4321', 'http://localhost:5173'],
         supports_credentials=True,
         allow_headers=['Content-Type', 'Authorization'])

    # Importamos as rotas aqui para evitar erro de importação circular
    from .routes import api
    app.register_blueprint(api)

    return app