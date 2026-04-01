function fnLimparCampos() {
    document.getElementById("formCadPessoa").reset()
}


function fnCadastrarPessoa() {

    let formDados = {
        nome: document.getElementById("cadNomePessoa").value,
        endereco: document.getElementById("cadEnderecoPessoa").value,
        cep: document.getElementById("cadCepPessoa").value,
        departamento: document.getElementById("cadDepartamentoPessoa").value,
        filial: document.getElementById("cadFilialPessoa").value,
        nascimento: document.getElementById("cadNascimentoPessoa").value,
        sexo: document.getElementById("cadSelectSexoPessoa").value,
        cargo: document.getElementById("cadCargoPessoa").value,
        telefone: document.getElementById("cadTelefonePessoa").value,
        email: document.getElementById("cadEmailPessoa").value
    }

      console.dir(formDados)
      fetch('http://localhost:3000/cadastropessoas/', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.status())
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
