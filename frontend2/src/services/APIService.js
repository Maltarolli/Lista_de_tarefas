import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL;
const tarefaId = 13
const titulo = "mudar"
const descricao = "mudar"
const status = "Concluido"

export async function getFunction(){
    const response = await axios.get(`${API_URL}/${tarefaId}`);
    return response.data;
}


export async function postFunction() {
    try {
      // Realiza a requisição POST passando os dados no corpo da requisição
      const response = await axios.post(`${API_URL}`, {
            titulo: titulo,
            descricao: descricao,
            status: status
        });
      return response.data; // Retorna os dados da tarefa criada
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw error;
    }
}

export async function deleteFunction(){
    const response = await axios.delete(`${API_URL}/${tarefaId}`);
    return response.data;
}

export async function putFunction() {
    try {
      // Realiza a requisição POST passando os dados no corpo da requisição
      const response = await axios.put(`${API_URL}/${tarefaId}`, {
            titulo: titulo,
            descricao: descricao,
            status: status
        });
      return response.data; // Retorna os dados da tarefa criada
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      throw error;
    }
}