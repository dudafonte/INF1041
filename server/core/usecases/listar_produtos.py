from core.entities.produto import Produto
from core.interfaces.produto_repository_interface import ProdutoRepositoryInterface


class ListarProdutos:
    def __init__(self, repository: ProdutoRepositoryInterface):
        self.repository = repository

    def executar(self) -> list[Produto]:
        return self.repository.listar()
