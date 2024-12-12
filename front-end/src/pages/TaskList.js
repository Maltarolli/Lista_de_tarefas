import React, { useState, useEffect } from 'react';
import { getFunction, postFunction, deleteFunction, putFunction } from '../services/APIService';

const TaskList = () => {
  // Estados para gerenciar as tarefas, tarefa sendo editada e criação de novas tarefas
  const [tasks, setTasks] = useState([]); // Lista de tarefas
  const [editingTask, setEditingTask] = useState(null); // Tarefa atualmente sendo editada
  const [showCreateForm, setShowCreateForm] = useState(false);  // Controla a exibição do formulário de criação
  const [newTask, setNewTask] = useState({
    titulo: '', // Título da nova tarefa
    descricao: '', // Descrição da nova tarefa
    status: 'Pendente',  // Status padrão da nova tarefa
  });

  // Função para buscar todas as tarefas ao carregar o componente
  const fetchTasks = async () => {
    try {
      const data = await getFunction(); // Chama a função para obter as tarefas
      setTasks(data); // Define a lista de tarefas recebida
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error); // Loga o erro no console
    }
  };

  // Função para deletar uma tarefa
  const handleDelete = async (id) => {
    try {
      await deleteFunction(id); // Chama a função de deletar passando o ID da tarefa
      setTasks(tasks.filter((task) => task.id !== id)); // Remove a tarefa deletada da lista local
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error); // Loga o erro no console
    }
  };

  // Função para salvar as alterações feitas em uma tarefa
  const handleSaveEdit = async () => {
    try {
      await putFunction(editingTask.id, editingTask.titulo, editingTask.descricao, editingTask.status); // Atualiza a tarefa editada
      setEditingTask(null); // Finaliza a edição
      fetchTasks(); // Atualiza a lista de tarefas
    } catch (error) {
      console.error("Erro ao editar tarefa:", error); // Loga o erro no console
    }
  };

  // Função para criar uma nova tarefa
  const handleCreateTask = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await postFunction(newTask.titulo, newTask.descricao, newTask.status); // Chama a função para criar a nova tarefa
      setShowCreateForm(false); // Esconde o formulário de criação
      fetchTasks(); // Atualiza a lista de tarefas
      setNewTask({ titulo: '', descricao: '', status: 'Pendente' }); // Limpa os campos do formulário
    } catch (error) {
      console.error("Erro ao criar tarefa:", error); // Loga o erro no console
    }
  };

  // useEffect para buscar as tarefas assim que o componente é montado
  useEffect(() => {
    fetchTasks(); // Chama a função para buscar as tarefas
  }, []);

  return (
    <div>
      <header>
        <nav className="nav bg-dark">
          {/* Link para exibir/ocultar o formulário de criação */}
          <a className="nav-link text-primary" href="#" onClick={() => setShowCreateForm(!showCreateForm)}>
            Criar Tarefa
          </a>
        </nav>
      </header>
      <main className="container mt-4">
        {/* Exibe o formulário de criação de tarefa se showCreateForm for true */}
        {showCreateForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Criar Nova Tarefa</h5>
              <form onSubmit={handleCreateTask}>
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTask.titulo}
                    onChange={(e) => setNewTask({ ...newTask, titulo: e.target.value })} // Atualiza o estado do título
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Descrição</label>
                  <textarea
                    className="form-control"
                    value={newTask.descricao}
                    onChange={(e) => setNewTask({ ...newTask, descricao: e.target.value })} // Atualiza o estado da descrição
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })} // Atualiza o estado do status
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Completada">Completada</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">Criar Tarefa</button>
              </form>
            </div>
          </div>
        )}

        <div className="row">
          {/* Renderiza cada tarefa como um card */}
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4">
              <div className="card" style={{ width: '18rem' }}>
                <div className="card-body bg-light">
                  {/* Renderização condicional: edição ou exibição da tarefa */}
                  {editingTask?.id === task.id ? (
                    <>
                      <input
                        type="text"
                        value={editingTask.titulo}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, titulo: e.target.value }) // Atualiza o título em edição
                        }
                        className="form-control mb-2"
                      />
                      <textarea
                        value={editingTask.descricao}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, descricao: e.target.value }) // Atualiza a descrição em edição
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
                        onClick={() => setEditingTask(task)} // Ativa o modo de edição para esta tarefa
                      >
                        Editar
                      </a>
                      <a
                        href="#"
                        className="card-link text-danger"
                        onClick={() => handleDelete(task.id)} // Deleta a tarefa ao clicar
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
