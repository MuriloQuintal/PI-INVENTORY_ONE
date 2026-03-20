const modal = document.getElementById('modalProduto')
modal.addEventListener('show.bs.modal', ()=>{
    console.log('ola')
})

const modalDetalhes = document.getElementById('modalDetalhesProduto')
modalDetalhes.addEventListener('show.bs.modal', ()=>{
    console.log('ola')
})

const modalEditar = document.getElementById('modalEditarProduto')
modalEditar.addEventListener('show.bs.modal', ()=>{
    console.log('oii')
})

function fnCadastrarProduto(){
    let formProduto = {
        equipamento: document.getElementById("cadProduto").value,
        modelo: document.getElementById("cadModeloProduto").value,
        marca: document.getElementById("cadMarcaProduto").value,
        configuracao: document.getElementById("cadConfiguracaoProduto").value,
        serie: document.getElementById("cadNumeroSerieProduto").value,
        imei: document.getElementById("cadImeiProduto").value,
        dataCompra: document.getElementById("cadDataCompraProduto").value,
        dataCadastro: "calcular",
        valor: document.getElementById("cadValorCompraProduto").value,
        nroDocumento: document.getElementById("cadDocumentNfProduto").value,
        nroddd: document.getElementById("cadDddProduto").value,
        nrolinha: document.getElementById("cadLinhaProduto").value,
        codchip: document.getElementById("cadCodChipProduto").value,
        operadora: document.getElementById("cadOperadoraProduto").value,
        pinoperadora: document.getElementById("cadPinOperadoraProduto").value,
        localestoque: document.getElementById("cadLocalidadeEstoqueProduto").value,
        responsavelestoque: document.getElementById("cadResponsavelProduto").value,
        ean: document.getElementById("cadEanProduto").value,
        alugado: document.getElementById("cadAlugadoProduto").value,
        disponivel: document.getElementById("cadDisponibilidadeProduto").value
    }

    console.dir(formProduto)
}

const btnSalvar = document.getElementById("btnSalvarProduto")
btnSalvar.addEventListener('click',() => {
    fnCadastrarProduto()
})

function fnEditarProduto(){
    let formEditProduto = {
        equipamento: document.getElementById("").value,
        modelo: document.getElementById("").value,
        marca: document.getElementById("").value,
        configuracao: document.getElementById("").value,
        serie: document.getElementById("").value,
        imei: document.getElementById("").value,
        dtacompra: document.getElementById("").value,
        dtacadastro: document.getElementById("").value,
        valor: document.getElementById("").value,
        nrodocument: document.getElementById("").value,
        nroddd: document.getElementById("").value,
        nrolinha: document.getElementById("").value,
        codchip: document.getElementById("").value,
        operadora: document.getElementById("").value,
        pinoperadora: document.getElementById("").value,
        localestoque: document.getElementById("").value,
        responsavelestoque: document.getElementById("").value,
        ean: document.getElementById("").value,
        alugado: document.getElementById("").value,
        disponivel: document.getElementById("").value
    }

    console.dir(formEditProduto)
}