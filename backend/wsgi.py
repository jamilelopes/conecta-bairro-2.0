# Ponto de entrada para o servidor de producao (gunicorn wsgi:app)
from src import create_app

app = create_app()
