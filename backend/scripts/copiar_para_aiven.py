# Script de uso unico: cria as tabelas no Aiven e copia os dados do MySQL local
import os
import sys

BACKEND = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND)

from dotenv import load_dotenv
load_dotenv(os.path.join(BACKEND, ".env"))

from sqlalchemy import create_engine, select, func
from src import db
from src import models  # noqa: F401

local_url = os.getenv("DATABASE_URL")
aiven_url = os.getenv("AIVEN_URL")
ca = os.path.join(BACKEND, "certs", "aiven-ca.pem")

if not local_url or not aiven_url:
    sys.exit("Faltou DATABASE_URL (no .env) ou AIVEN_URL (no terminal).")

local = create_engine(local_url)
aiven = create_engine(aiven_url, connect_args={"ssl": {"ca": ca}})

db.metadata.create_all(aiven)
print("Tabelas criadas no Aiven.")

with local.connect() as lc, aiven.begin() as ac:
    for table in db.metadata.sorted_tables:
        rows = [dict(r._mapping) for r in lc.execute(table.select())]
        ja_tem = ac.execute(select(func.count()).select_from(table)).scalar()
        if rows and ja_tem == 0:
            ac.execute(table.insert(), rows)
            print(table.name + ": copiadas " + str(len(rows)) + " linhas")
        else:
            print(table.name + ": nada a copiar (local=" + str(len(rows)) + ", aiven=" + str(ja_tem) + ")")

print("Pronto.")
