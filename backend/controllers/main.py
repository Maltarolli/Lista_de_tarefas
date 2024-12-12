from fastapi import FastAPI, HTTPException
from starlette.responses import JSONResponse
from backend.models.models import Tarefa
from backend.schema.schema import TarefaBase, TarefaCriada
from fastapi.middleware.cors import CORSMiddleware

# Inicializa a aplicação FastAPI
app = FastAPI()

origins = [
    "http://localhost:3000",  # Origem do seu frontend
    "http://127.0.0.1:3000", # Outra origem possível
]

# Configura o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Permite as origens definidas na lista
    allow_credentials=True,  # Permite cookies/autenticação
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os cabeçalhos
)


# Endpoint 1: Criar uma nova tarefa
@app.post("/tarefas/", response_model=TarefaCriada)
def criar_tarefa(tarefa: TarefaBase):
    tarefa_id = Tarefa.criar_tarefa(tarefa.titulo, tarefa.descricao, tarefa.status)
    if not tarefa_id:
        raise HTTPException(status_code=500, detail="Erro ao criar tarefa")
    
    # Resposta JSON 
    tarefa_criada = {
        "id": tarefa_id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status
    }

    return JSONResponse(status_code=201, content=tarefa_criada)


# Endpoint 3: Buscar uma tarefa por ID
@app.get("/tarefas/{tarefa_id}", response_model=TarefaCriada)
def buscar_tarefa(tarefa_id: int):
    tarefa = Tarefa.buscar_tarefa(tarefa_id) 
    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")

    return TarefaCriada(
        id=tarefa.id,
        titulo=tarefa.titulo,
        descricao=tarefa.descricao,
        status=tarefa.status,
        create_tarefa=tarefa.create_tarefa,
        update_tarefa=tarefa.update_tarefa,
    )


    #return JSONResponse(status_code=200, content=busca)


# Endpoint 2: Listar todas as tarefas
@app.get("/tarefas/", response_model=list[TarefaCriada])
def listar_tarefas():
    tarefas = Tarefa.listar_tarefas()
    return [
        TarefaCriada(
            id=tarefa.id,
            titulo=tarefa.titulo,
            descricao=tarefa.descricao,
            status=tarefa.status,
            create_tarefa=tarefa.create_tarefa,
            update_tarefa=tarefa.update_tarefa
        ) for tarefa in tarefas
    ]


# Endpoint 4: Atualizar uma tarefa
@app.put("/tarefas/{tarefa_id}", response_model=TarefaCriada)
def atualizar_tarefa(tarefa_id: int, tarefa: TarefaBase):
    sucesso = Tarefa.atualizar_tarefa(tarefa_id, tarefa.titulo, tarefa.descricao, tarefa.status)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    # Resposta JSON 
    tarefa_atualizada = {
        "id": tarefa_id,
        "titulo": tarefa.titulo,
        "descricao": tarefa.descricao,
        "status": tarefa.status
    }

    return JSONResponse(status_code=201, content=tarefa_atualizada)

# Endpoint 5: Deletar uma tarefa
@app.delete("/tarefas/{tarefa_id}")
def deletar_tarefa(tarefa_id: int):
    sucesso = Tarefa.deletar_tarefa(tarefa_id)
    if not sucesso:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return {"detail": "Tarefa deletada com sucesso"}
