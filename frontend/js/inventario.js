if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnListarInventarios() {
    fetch(`https://pi-inventory-one-fvwa.onrender.com/inventarios`, { method: "GET" })
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
            <td>${inventario.imei}</td>
            <td>
                <div class="d-flex gap-2 justify-content-center">
                    <button class="btn btn-primary btn-sm botaoDetalhesInventario" data-bs-toggle="modal"
                    data-bs-target="#modalDetalhesProduto" data-id="${inventario.idDisponivel}">
                    <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-danger btn-sm botaoDeletarInventario" data-id="${inventario.idDisponivel}">
                    <i class="bi bi-trash"></i>
                    </button>
                    </button>
                </div>
            </td>
        </tr>
    `

    document.querySelector(".corpo_tabelaInventarios").innerHTML += linhaInventario
}

function fnDetalhesInventario(idInventario) {
    fetch(`https://pi-inventory-one-fvwa.onrender.com/inventario/${idInventario}`, { method: "GET" })
        .then(resultado => resultado.json())
        .then((dados) => {
            console.log("Estou Aqui" + dados)
            fnPreencherCamposDetalhesInventario(dados[0])
        })
}

function fnPreencherCamposDetalhesInventario(inventario) {
    const data = inventario.dtacompra.split("T")[0].split("-")
    document.getElementById("nomeInventario").value = inventario.nome
    document.getElementById("telefoneInventario").value = inventario.telefone
    document.getElementById("empresaInventario").value = inventario.filial
    document.getElementById("emailInventario").value = inventario.email
    document.getElementById("departamentoInventario").value = inventario.departamento
    document.getElementById("produtoInventario").value = inventario.equipamento
    document.getElementById("imeiInventario").value = inventario.imei
    document.getElementById("documentoNfInventario").value = inventario.nrodocumento
    document.getElementById("detalhesTecnicosInventario").value = inventario.modelo
    document.getElementById("eanInventario").value = inventario.ean
    document.getElementById("marcaInventario").value = inventario.marca
    document.getElementById("responsavelInventario").value = inventario.responsavelestoque
    document.getElementById("configuracaoInventario").value = inventario.configuracao
    document.getElementById("dataCompraInventario").value = data[2] + "/" + data[1] + "/" + data[0]
    document.getElementById("numeroSerieInventario").value = inventario.serie
    document.getElementById("valorCompraInventario").value = "R$ " + inventario.valor
}

function fnDeletarInventario(id) {
    fetch(`https://pi-inventory-one-fvwa.onrender.com/inventario/${id}`, { method: "DELETE" })
        .then(resultado => resultado.status)
        .then((dados) => {
            console.log("Estou Aquiii")
            if (dados != 200) {
                Swal.fire({
                    icon: "error",
                    title: "Deu Errado ao deletar Inventario",
                });
                return
            } else {
                Swal.fire({
                    title: `Inventario do id ${id} Deletado`,
                    icon: "success",
                    confirmButtonText: "OK!!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload()
                    }
                })
            }
        })
}


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        const btnDetalhes = e.target.closest(".botaoDetalhesInventario")
        const btnDeletar = e.target.closest(".botaoDeletarInventario")

        if (btnDetalhes) {
            fnDetalhesInventario(btnDetalhes.dataset.id)
        }

        if (btnDeletar) {
            Swal.fire({
                title: "Deseja deletar essa Inventario?",
                text: "Não terá como recuperá-la após a deleção",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, Deletar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    fnDeletarInventario(btnDeletar.dataset.id)
                }
            })
        }
    });

});