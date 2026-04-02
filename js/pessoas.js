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
      fetch('http://localhost:3000/pessoa/', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(formDados)
    })
        .then(resposta => resposta.status())
        .then((dados) => {
            fnLimparCampos()
            fnMensagemSalvar()
            console.log(dados)

        })
        .catch(erro => console.log(erro.message))
}


    document.getElementById("salvarPessoa").addEventListener("click",function(){
        fnCadastrarPessoa()
        fnLimparCampos
    })