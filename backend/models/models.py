from datetime import datetime
import sqlite3
from backend.database.database import get_connection


# Classe para representar as tarefas
class Tarefa:
    def __init__(self, id, titulo, descricao, status, create_tarefa, update_tarefa):
        self.id = id
        self.titulo = titulo
        self.descricao = descricao
        self.status = status
        self.create_tarefa = create_tarefa
        self.update_tarefa = update_tarefa

    @staticmethod
    def listar_tarefas():
        conn = get_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM tarefas")
                rows = cursor.fetchall()
                return [Tarefa(*row) for row in rows]
            finally:
                conn.close()

    @staticmethod
    def criar_tarefa(titulo, descricao, status):
        conn = get_connection()
        if conn:
            try:
                cursor = conn.cursor()
                create_tarefa = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                update_tarefa = create_tarefa
                cursor.execute("""
                    INSERT INTO tarefas (titulo, descricao, status, create_tarefa, update_tarefa)
                    VALUES (?, ?, ?, ?, ?)
                """, (titulo, descricao, status, create_tarefa, update_tarefa))
                conn.commit()
                return cursor.lastrowid
            finally:
                conn.close()


    @staticmethod
    def atualizar_tarefa(id, titulo, descricao, status):
        conn = get_connection()
        if conn:
            try:
                cursor = conn.cursor()
                update_tarefa = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                cursor.execute("""
                    UPDATE tarefas
                    SET titulo = ?, descricao = ?, status = ?, update_tarefa = ?
                    WHERE id = ?
                """, (titulo, descricao, status, update_tarefa, id))
                conn.commit()
                return cursor.rowcount > 0
            finally:
                conn.close()

    @staticmethod
    def deletar_tarefa(id):
        conn = get_connection()
        if conn:
            try:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM tarefas WHERE id = ?", (id,))
                conn.commit()
                return cursor.rowcount > 0
            finally:
                conn.close()
