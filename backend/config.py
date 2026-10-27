# Configuracoes de conexao com o MySQL (traducao do .env para o Flask)
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
CA_PATH = os.path.join(BASE_DIR, "certs", "aiven-ca.pem")


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")

    # Evita erro de conexao caiu/dormiu em bancos na nuvem
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 280,
    }

    # Conexao segura (SSL) so quando DB_USE_SSL=true (producao com Aiven)
    if os.getenv("DB_USE_SSL") == "true" and os.path.exists(CA_PATH):
        SQLALCHEMY_ENGINE_OPTIONS["connect_args"] = {"ssl": {"ca": CA_PATH}}
