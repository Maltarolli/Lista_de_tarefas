import sqlite3

# Nome do banco de dados
DATABASE_NAME = "LISTA_DE_TAREFAS.db"

def criar_banco_e_tabela():
    conn = sqlite3.connect(DATABASE_NAME)
    try:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                descricao TEXT,
                status TEXT NOT NULL,
                create_tarefa TEXT NOT NULL,
                update_tarefa TEXT NOT NULL
            )
        """)
        conn.commit()
        print("Banco e tabela criados com sucesso!")
    finally:
        conn.close()

if __name__ == "__main__":
    criar_banco_e_tabela()
