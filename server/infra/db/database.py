import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy_utils import create_database, database_exists

from infra.db.models import Base


DATABASE_DIR = "database"
DATABASE_URL = f"sqlite:///{DATABASE_DIR}/db.sqlite3"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)


def criar_banco():
    os.makedirs(DATABASE_DIR, exist_ok=True)

    if not database_exists(engine.url):
        create_database(engine.url)

    Base.metadata.create_all(bind=engine)
