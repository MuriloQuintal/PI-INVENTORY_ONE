if (localStorage.getItem("logado") != "true") {
    window.location.href = "login.html"
}

function fnValidacaoBootstrap() {
    'use strict'

    const forms = document.querySelectorAll('.validarForms')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
                form.classList.add('was-validated')
                return
            }



        }, false)
    })

}

function fnLimparCampos() {
    document.getElementById("formCadPessoa").reset()
}


function fnCadastrarPessoa() {
    let formDados = {
        codPessoa: document.getElementById("cadCodPessoa").value,
        nome: document.getElementById("cadNomePessoa").value,
        nascimento: document.getElementById("cadNascimentoPessoa").value,
        sexo: document.getElementById("cadSelectSexoPessoa").value,
        cargo: document.getElementById("cadCargoPessoa").value,
        departamento: document.getElementById("cadDepartamentoPessoa").value,
        filial: document.getElementById("cadFilialPessoa").value,
        telefone: document.getElementById("cadTelefonePessoa").value,
        email: document.getElementById("cadEmailPessoa").value,
        endereco: document.getElementById("cadEnderecoPessoa").value,
        cep: document.getElementById("cadCep").value

    }

    console.dir(formDados)
    fetch('http://localhost:3000/pessoas/', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.status)
        .then((dados) => {
            fnLimparCampos()

            console.log(dados)

        })
        .catch(erro => console.log(erro.message))
}

let btn_salvar = document.getElementById("salvarPessoa")
btn_salvar.addEventListener("click", function () {
    fnCadastrarPessoa()
})

function fnListarPessoas() {
    fetch(`http://localhost:3000/pessoas`, { method: "GET" })
        .then(resposta => resposta.json())
        .then((pessoas) => {
            if (pessoas.length <= 0) {
                console.log("Não Tem Nada Aqui")
                // Criar Função Para exibir imagem no lugar da tabela
            }

            pessoas.forEach(pessoa => {
                fnMontarLinhaPessoa(pessoa)
            })
        })
}

fnListarPessoas()





function fnMontarLinhaPessoa(pessoa) {


    let linhaPessoa = `
    <tr>
    <td>${pessoa.codPessoa}</td>
    <td>${pessoa.nome}</td>
    <td>${pessoa.filial}</td>
    <td>${pessoa.cargo}</td>
    <td>${pessoa.departamento}</td>

<td>  
    <div class="d-flex gap-2 justify-content-center">
    <button class="btn btn-primary btn-sm botaoDetalhesPessoa" data-bs-toggle="modal"
    data-bs-target="#modalDetalhesPessoa" data-id="${pessoa.id}">
    <i class="bi bi-eye"></i>
    </button>
    <button data-bs-toggle="modal" data-bs-target="#modalEditarPessoa" data-id="${pessoa.id}"
    class="btn btn-warning btn-sm botaoEditarPessoa">
    <i class="bi bi-pencil-square"></i>
    </button>
    <button class="btn btn-danger btn-sm botaoDeletarPessoa" data-id="${pessoa.id}">
    <i class="bi bi-trash"></i>
    </button>
    </div>
    </td>
    </tr>
    `

    document.querySelector(".corpo_tabelaPessoas").innerHTML += linhaPessoa
}


function fnListarPessoa(id) {
    fetch(`http://localhost:3000/pessoas/${id}`, { method: "GET" })
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            // fnPreencherModalEditPessoa(dados)
            fnPreencherModalDetalhesPessoa(dados)
        })
}


function fnPreencherModalDetalhesPessoa(pessoa) {
    let arrayPessoa = pessoa[0]
    console.log(arrayPessoa)

    // const disponivelDetalhePessoa = document.getElementById("detalheDisponibilidadePessoa")
    // let tipoDisponibilidade = "bg-success"
    // let produtoDisponivel = "Disponivel"
    // if (arrayProduto.disponivel != "S") {
    //     produtoDisponivel = "Indisponivel"
    //     tipoDisponibilidade = "bg-danger"
    //     disponivelDetalheProduto.classList.add(`${tipoDisponibilidade}`)
    // }

    // disponivelDetalheProduto.innerText = produtoDisponivel


    // console.log(produtoDisponivel)

    document.getElementById("detalhesNomePessoa").value = arrayPessoa.nome
    document.getElementById("detalhesEnderecoPessoa").value = arrayPessoa.endereco
    document.getElementById("detalhesCepPessoa").value = arrayPessoa.cep
    document.getElementById("detalhesDepartamentoPessoa").value = arrayPessoa.departamento
    document.getElementById("detalhesFilialPessoa").value = arrayPessoa.filial
    // document.getElementById("detalheImeiProduto").value = arrayProduto.imei
    document.getElementById("detalhesNascimentoPessoa").value = arrayPessoa.nascimento.split("T")[0]
    document.getElementById("detalhesSelectSexoPessoa").value =
        arrayPessoa.sexo === "M" ? "Masculino" :
            arrayPessoa.sexo === "F" ? "Feminino" : "Não declarar"
    document.getElementById("detalhesCargoPessoa").value = arrayPessoa.cargo
    // document.getElementById("").value = arrayProduto.nroddd
    // document.getElementById("").value = arrayProduto.nrolinha
    // document.getElementById("").value = arrayProduto.codchip
    // document.getElementById("").value = arrayProduto.operadora
    // document.getElementById("").value = arrayProduto.pinoperadora
    document.getElementById("detalhesTelefonePessoa").value = arrayPessoa.telefone
    document.getElementById("detalhesEmailPessoa").value = arrayPessoa.email
    document.getElementById("detalhescodPessoa").value = arrayPessoa.codPessoa
    // document.getElementById("").value = arrayProduto.alugado
    //     document.getElementById("editDisponibilidadePessoa").value = arrayPessoa.disponivel
}





document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("click", (e) => {
        const btnEditar = e.target.closest(".botaoEditarPessoa")
        const btnDetalhes = e.target.closest(".botaoDetalhesPessoa")
        const btnDeletar = e.target.closest(".botaoDeletarPessoa")
        const btnSalvarEdit = e.target.closest(".botaoSalvarEdicaoPessoa")

        // if (btnEditar) {
        //     fnListarPessoa(btnEditar.dataset.id)
        // }

        if (btnDetalhes) {
            fnListarPessoa(btnDetalhes.dataset.id)
        }

        if (btnDeletar) {
            Swal.fire({
                title: "Deseja deletar essa Pessoa?",
                text: "Não terá como recuperá-la após a deleção",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, Deletar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    fnDeletarPessoa(btnDeletar.dataset.id) // só chama a função, sem mais nada aqui
                }
            })
        }

        // if (btnSalvarEdit) {
        //     fnEditarPessoa(btnSalvarEdit.dataset.id)
        //     window.location.reload()
        // }
    })

})


function fnDeletarPessoa(id) {
    fetch(`http://localhost:3000/pessoas/${id}`, { method: "DELETE" })
        .then(resposta => resposta.json())
        .then(dados => {
            console.dir(dados)
            if (dados.valorResultado == "Errado") {
                Swal.fire({
                    title: "Para excluir pessoa, desvincule os itens no inventario",
                    text: "Deseja ir ao inventario?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ir ao inventario",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "inventario.html"
                    }
                })
                return
            }

            Swal.fire({
                title: "Deletado",
                text: "Pessoa Deletada Com Sucesso!",
                icon: "success"
            }).then(() => {
                window.location.reload() // recarrega só após fechar o Swal
            })
        })
        .catch(erro => console.log(erro.message))
}