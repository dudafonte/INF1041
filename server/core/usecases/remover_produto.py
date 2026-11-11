from core.interfaces.produto_repository_interface import ProdutoRepositoryInterface
from core.usecases.erros import ProdutoNaoEncontrado


class RemoverProduto:
    def __init__(self, repository: ProdutoRepositoryInterface):
        self.repository = repository

    def executar(self, nome: str) -> None:
        if not self.repository.remover_por_nome(nome):
            raise ProdutoNaoEncontrado(nome)
