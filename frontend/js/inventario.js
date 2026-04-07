if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnListarInventarios() {
    fetch(`http://localhost:3000/inventarios`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((inventarios) => {
            inventarios.forEach(inventario => {
                fnCriarLinhasInventario(inventario)
            })
        })
}

fnListarInventarios()

function fnCriarLinhasInventario(inventario) {
    console.log(inventario)

    let linhaInventario = `
        <tr>
            <td>${inventario.nome}</td>
            <td>${inventario.telefone}</td>
            <td>${inventario.filial}</td>
            <td>${inventario.equipamento}</td>
            <td>${inventario.modelo}</td>
            <td>${inventario.serie}</td>
            <td>${inventario.nrolinha}</td>
            <td>
                <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-primary btn-sm botaoDetalhesInventario" data-bs-toggle="modal"
                    data-bs-target="#modalDetalhesProduto" data-id="${inventario.idDisponivel}">
                    <i class="bi bi-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `

    document.querySelector(".corpo_tabelaInventarios") += linhaInventario
}


// Finalizar daqui para baixo
function fnDetalhesInventario(idInventario) {
    fetch(`http://localhost:3000/inventario/${idInventario}`, { method: "GET" })
        .then(resultado => resultado.status)
        .then((dados) => {
            fnPreencherCamposDetalhesInventario(dados)
        })
}

function fnPreencherCamposDetalhesInventario(inventario) {
    document.getElementById("")
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const btnDetalhes = e.target.closest(".botaoDetalhesInventario")

        if (btnDetalhes) {
            fnDetalhesInventario(btnDetalhes.dataset.id)
        }
    });

});