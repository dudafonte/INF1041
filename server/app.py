from flask import redirect
from flask_cors import CORS
from flask_openapi3 import Info, OpenAPI, Tag

from api.controllers.produto_controller import registrar_rotas_produto
from core.usecases.adicionar_produto import AdicionarProduto
from core.usecases.buscar_produto import BuscarProduto
from core.usecases.listar_produtos import ListarProdutos
from core.usecases.remover_produto import RemoverProduto
from infra.db.database import criar_banco
from infra.gateways.produto_repository_sqlalchemy import ProdutoRepositorySQLAlchemy


info = Info(title="Minha API", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

criar_banco()

repository = ProdutoRepositorySQLAlchemy()
adicionar = AdicionarProduto(repository)
listar = ListarProdutos(repository)
buscar = BuscarProduto(repository)
remover = RemoverProduto(repository)

registrar_rotas_produto(app, adicionar, listar, buscar, remover)

documentacao_tag = Tag(name="Documentação")


@app.get("/", tags=[documentacao_tag])
def documentacao():
    return redirect("/openapi")


if __name__ == "__main__":
    app.run(debug=True)