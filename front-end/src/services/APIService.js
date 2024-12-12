import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL; // URL base da API, configurada através de variáveis de ambiente

// Função para buscar todas as tarefas
export async function getFunction() {
  try {
    const response = await axios.get(`${API_URL}`); // Faz uma requisição GET para a API
    return response.data; // Retorna os dados recebidos da API
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error); // Loga o erro no console
    throw error; // Relança o erro para ser tratado no nível superior
  }
}

// Função para criar uma nova tarefa
export async function postFunction(titulo, descricao, status) {
  try {
    const response = await axios.post(`${API_URL}`, { titulo, descricao, status }); // Faz uma requisição POST com os dados da nova tarefa
    return response.data; // Retorna os dados da tarefa criada
  } catch (error) {
    console.error("Erro ao criar tarefa:", error); // Loga o erro no console
    throw error; // Relança o erro para ser tratado no nível superior
  }
}

// Função para deletar uma tarefa específica
export async function deleteFunction(tarefaId) {
  try {
    const response = await axios.delete(`${API_URL}/${tarefaId}`); // Faz uma requisição DELETE com o ID da tarefa
    return response.data; // Retorna os dados de resposta da API
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error); // Loga o erro no console
    throw error; // Relança o erro para ser tratado no nível superior
  }
}

// Função para editar uma tarefa existente
export async function putFunction(tarefaId, titulo, descricao, status) {
  try {
    const response = await axios.put(`${API_URL}/${tarefaId}`, { titulo, descricao, status }); // Faz uma requisição PUT com os novos dados da tarefa
    return response.data; // Retorna os dados atualizados da tarefa
  } catch (error) {
    console.error("Erro ao editar tarefa:", error); // Loga o erro no console
    throw error; // Relança o erro para ser tratado no nível superior
  }
}
