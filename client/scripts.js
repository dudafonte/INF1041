const API_URL = "http://127.0.0.1:5000";

// Função para carregar a lista de produtos
async function getList() {
    const response = await fetch(`${API_URL}/produtos`);
    const data = await response.json();

    data.produtos.forEach((produto) => {
        insertList(produto.nome, produto.quantidade, produto.valor);
    });
}

// Função para adicionar um produto pela API
async function postItem(nome, quantidade, valor) {
    const response = await fetch(`${API_URL}/produto`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome,
            quantidade: Number(quantidade),
            valor: Number(valor),
        }),
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

// Função para remover um produto pela API
async function deleteItem(nome) {
    const response = await fetch(
        `${API_URL}/produto?nome=${encodeURIComponent(nome)}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message);
    }
}

// Função para adicionar um novo item
async function newItem() {
    const nome = document.getElementById("newInput").value;
    const quantidade = document.getElementById("newQuantity").value;
    const valor = document.getElementById("newPrice").value;

    if (nome.trim() === "") {
        alert("Escreva o nome de um item!");
        return;
    }

    if (
        quantidade.trim() === "" ||
        valor.trim() === "" ||
        Number.isNaN(Number(quantidade)) ||
        Number.isNaN(Number(valor))
    ) {
        alert("Quantidade e valor precisam ser números!");
        return;
    }

    try {
        const produto = await postItem(nome, quantidade, valor);
        insertList(produto.nome, produto.quantidade, produto.valor);
        document.getElementById("newInput").value = "";
        document.getElementById("newQuantity").value = "";
        document.getElementById("newPrice").value = "";
        alert("Item adicionado!");
    } catch (error) {
        alert(error.message);
    }
}

// Função para inserir um produto na tabela
function insertList(nome, quantidade, valor) {
    const table = document.getElementById("myTable");
    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    const quantityCell = row.insertCell(1);
    const valueCell = row.insertCell(2);
    const actionCell = row.insertCell(3);

    nameCell.textContent = nome;
    quantityCell.textContent = quantidade;
    valueCell.textContent = valor;

    const close = document.createElement("span");
    close.className = "close";
    close.textContent = "×";
    close.onclick = async function () {
        if (!confirm("Você tem certeza?")) {
            return;
        }

        try {
            await deleteItem(nome);
            row.remove();
            alert("Removido!");
        } catch (error) {
            alert(error.message);
        }
    };
    actionCell.appendChild(close);
}

getList();
