# Onde a aplicacao e criada (factory)
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, static_folder='../static', static_url_path='/static')
    app.config.from_object(Config)

    db.init_app(app)

    # CORS: sites autorizados a chamar a API
    # Em producao, CORS_ORIGINS recebe a URL da Vercel (varias separadas por virgula)
    origens_locais = [
        'http://localhost:5000',
        'http://localhost:4321',
        'http://localhost:5173',
    ]
    origens_extras = [
        o.strip() for o in os.getenv('CORS_ORIGINS', '').split(',') if o.strip()
    ]

    CORS(app,
         origins=origens_locais + origens_extras,
         supports_credentials=True,
         allow_headers=['Content-Type', 'Authorization'])

    # Importamos as rotas aqui para evitar erro de importacao circular
    from .routes import api
    app.register_blueprint(api)

    return app
