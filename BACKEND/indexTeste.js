require("dotenv").config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

const conexao = require('../banco_dados/conexaoBanco')

app.get('/produtos', (req, res) => {
    conexao.query(`SELECT * FROM produtos`, (erro, lista_produtos) => {
        if (erro) {
            console.log("Deu Errado")
            return;
        }
        res.send(lista_produtos)
        console.log("Deu Certo")
    })
})

app.get("/produtos/:id", (req, res) => {
    const id = req.params.id

    conexao.query(`SELECT * FROM produtos WHERE id = ?`, [id], (erro, resultadoProduto) => {
        if (erro) {
            console.log("Erro ao consultar produto:" + erro)
        }

        res.send(resultadoProduto)
    })
})

app.post('/produtos', (req, res) => {
    const dados = req.body
    conexao.query(`INSERT INTO produtos set ?`, [dados], (erro, resultado) => {
        if (erro) {
            console.error("Deu Erro Aqui:::::" + erro)
            return
        }

        console.log("Produto Cadastrado!!!")
    })
})

app.put("/produtos/:id", (req, res) => {
    const id = req.params.id
    const dados = req.body
    query.conexao(`UPDATE FROM produtos SET ? WHERE id = ${id}`, [dados], (erro, resultado) => {
        if (erro) {
            console.error("Deu Erro Aqui:::::" + erro)
            return
        }

        console.log("Produto Editado!!!")
        res.send(resultado)
    })
})

app.delete("/produtos/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`DELETE FROM produto WHERE id = ${id}`, (erro, resultado) => {
        if (erro) {
            console.error("Deu Erro Aqui:::::" + erro)
            return
        }

        console.log("Produto Deletado!!!")
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});