from datetime import datetime
from pydantic import BaseModel

# Schema para validação de entrada
class TarefaBase(BaseModel):
    titulo: str
    descricao: str | None = None
    status: str

# Schema para saída
class TarefaCriada(TarefaBase):
    id: int
    create_tarefa: datetime
    update_tarefa: datetime
