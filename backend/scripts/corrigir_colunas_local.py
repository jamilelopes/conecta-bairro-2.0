# Script de uso unico: adiciona no MySQL local as colunas que existem no models.py e faltam no banco
import os
import sys

BACKEND = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND)

from dotenv import load_dotenv
load_dotenv(os.path.join(BACKEND, ".env"))

from sqlalchemy import create_engine, inspect, text, Boolean
from src import db
from src import models  # noqa: F401

url = os.getenv("DATABASE_URL")
if not url:
    sys.exit("DATABASE_URL nao encontrada no backend/.env")

engine = create_engine(url)
insp = inspect(engine)
alterou = False

with engine.begin() as conn:
    for table in db.metadata.sorted_tables:
        if not insp.has_table(table.name):
            print(table.name + ": tabela nao existe (o run.py cria sozinho)")
            continue
        existentes = set(c["name"] for c in insp.get_columns(table.name))
        for col in table.columns:
            if col.name not in existentes:
                tipo = col.type.compile(dialect=engine.dialect)
                extra = " DEFAULT 0" if isinstance(col.type, Boolean) else ""
                sql = "ALTER TABLE `" + table.name + "` ADD COLUMN `" + col.name + "` " + tipo + " NULL" + extra
                conn.execute(text(sql))
                print("Adicionada: " + table.name + "." + col.name + " (" + tipo + ")")
                alterou = True

print("Pronto." if alterou else "Nenhuma coluna faltando.")
