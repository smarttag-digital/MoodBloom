
import sqlite3
from pathlib import Path

# Pasta onde o banco de dados será armazenado
PASTA_PROJETO = Path(__file__).resolve().parent
PASTA_DADOS = PASTA_PROJETO / "instance"
CAMINHO_BANCO = PASTA_DADOS / "moodbloom.db"


def conectar():
    """Abre uma conexão com o banco de dados SQLite."""
    PASTA_DADOS.mkdir(exist_ok=True)
    conexao = sqlite3.connect(CAMINHO_BANCO)
    conexao.row_factory = sqlite3.Row
    return conexao


def criar_tabela():
    """Cria a tabela de registros de humor, caso ela não exista."""
    with conectar() as conexao:
        conexao.execute("""
            CREATE TABLE IF NOT EXISTS registros (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                humor TEXT NOT NULL,
                anotacao TEXT NOT NULL DEFAULT '',
                data TEXT NOT NULL
            )
        """)
