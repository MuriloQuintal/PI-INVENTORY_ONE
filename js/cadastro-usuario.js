function fnLimparCampos() {
    document.getElementById("cad-user").reset()
}

function fnCadastrarUsuario() {

    let formDados = {
        nome:document.getElementById("campoNome").value,
        email:document.getElementById("campoEmail").value,
        senha:document.getElementById("campoSenha").value,
        telefone:document.getElementById("campoTelefone").value

    }
    console.dir(formDados)

    // fetch('http://localhost:3001/cad-usuario/', {
    //     method: 'POST',
    //     headers: { 'content-Type': 'application/json'},
    //     body: JSON.stringify(formDados)
})
.then(resposta => resposta.json())
.then((dados)=>{
    fnLimparCampos()
    console.log(dados)

})
.catch(erro => console.log(erro.message))
}