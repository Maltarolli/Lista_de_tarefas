import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

// Função para buscar todas as tarefas
export async function getFunction() {
  try {
    const response = await axios.get(`${API_URL}`); // Solicita todas as tarefas
    return response.data; // Retorna os dados da API
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    throw error;
  }
}

// Outras funções (delete, post, put, etc.)
export async function postFunction(titulo, descricao, status) {
  try {
    const response = await axios.post(`${API_URL}`, { titulo, descricao, status });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

export async function deleteFunction(tarefaId) {
  try {
    const response = await axios.delete(`${API_URL}/${tarefaId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
}

export async function putFunction(tarefaId, titulo, descricao, status) {
  try {
    const response = await axios.put(`${API_URL}/${tarefaId}`, { titulo, descricao, status });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw error;
  }
}
