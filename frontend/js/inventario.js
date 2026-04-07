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

    document.querySelector(".corpo_tabelaInventarios").innerHTML += linhaInventario
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
    console.dir(inventario)
    document.getElementById("nomeInventario").value = "inventario.nome"
    // document.getElementById("telefoneInventario").value = 
    // document.getElementById("empresaInventario").value = 
    // document.getElementById("emailInventario").value = 
    // document.getElementById("departamentoInventario").value = 
    // document.getElementById("produtoInventario").value = 
    // document.getElementById("imeiInventario").value = 
    // document.getElementById("documentoNfInventario").value = 
    // document.getElementById("nomeInventario").value = 
    // document.getElementById("detalhesTecnicosInventario").value = 
    // document.getElementById("eanInventario").value = 
    // document.getElementById("marcaInventario").value = 
    // document.getElementById("responsavelInventario").value = 
    // document.getElementById("configuracaoInventario").value = 
    // document.getElementById("dataCompraInventario").value = 
    // document.getElementById("numeroSerieInventario").value = 
    // document.getElementById("valorCompraInventario").value = 
}

document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const btnDetalhes = e.target.closest(".botaoDetalhesInventario")

        if (btnDetalhes) {
            fnDetalhesInventario(btnDetalhes.dataset.id)
        }
    });

});