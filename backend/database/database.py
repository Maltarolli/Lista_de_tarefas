import sqlite3

# Nome do banco de dados
DATABASE_NAME = "LISTA_DE_TAREFAS.db"

# Função para obter conexão com o banco de dados
def get_connection():
    try:
        conn = sqlite3.connect(DATABASE_NAME)
        return conn
    except sqlite3.Error as e:
        print(f"Erro ao conectar ao banco: {e}")
        return None
