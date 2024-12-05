import React, { useState, useEffect } from 'react';
import { getFunction, deleteFunction, putFunction } from '../services/APIService';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const data = await getFunction(); // Chamando a função getFunction
      setTasks(data); // Certifique-se de que o retorno seja um array
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFunction(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      await putFunction(editingTask.id, editingTask.titulo, editingTask.descricao, editingTask.status);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Busca as tarefas ao carregar o componente
  }, []);

  return (
    <div>
      <header>
        <nav className="nav bg-dark">
          <a className="nav-link text-primary" href="#">Ativo</a>
          <a className="nav-link text-primary" href="#">Completas</a>
          <a className="nav-link text-primary" href="#">Pendentes</a>
          <a className="nav-link text-success ml-auto" href="#">Logar</a>
        </nav>
      </header>
      <main className="container mt-4">
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body bg-light">
                  {editingTask?.id === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editingTask.titulo}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, titulo: e.target.value })
                        }
                        className="form-control mb-2"
                      />
                      <textarea
                        value={editingTask.descricao}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, descricao: e.target.value })
                        }
                        className="form-control mb-2"
                      />
                      <button onClick={handleSaveEdit} className="btn btn-primary">
                        Salvar Edição
                      </button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{task.titulo}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{task.status}</h6>
                      <p className="card-text">{task.descricao}</p>
                      <a
                        href="#"
                        className="card-link text-success"
                        onClick={() => setEditingTask(task)}
                      >
                        Editar
                      </a>
                      <a
                        href="#"
                        className="card-link text-danger"
                        onClick={() => handleDelete(task.id)}
                      >
                        Deletar
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskList;
