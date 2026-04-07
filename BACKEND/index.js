require('dotenv').config()

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())
app.use(express.json())

const bcrypt = require('bcrypt')
async function geraHash(senha) {
    const salts = 12;
    const senhaHash = await bcrypt.hash(senha, salts);
    return senhaHash;

}
const conexao = require('../banco_dados/db.js')


app.post("/cadastrousuarios/", async function (req, res) {
    const data = req.body;
    const senhaCriptografada = await geraHash(data.senha);
    data.senha = senhaCriptografada
    conexao.query(`INSERT INTO usuarios set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                res.json(erro);
            }
            console.log(resultado)
            res.json({ sucesso: true });

        });
})

app.post("/login/", function (req, res) {
    const email = req.body.email
    const senha = req.body.senha

    conexao.query(`select * from usuarios where email = '${email}'`, function (erro, resultado, campos) {
        if (erro) {
            res.send(erro)
        } else {
            if (resultado.length > 0) {
                const senhaCorreta = bcrypt.compareSync(senha, resultado[0].senha)
                if (senhaCorreta) {
                    res.sendStatus(200)
                } else {
                    res.sendStatus(401)
                }
            } else {
                res.sendStatus(401)
            }
        }
    })
})



app.post("/pessoas/", function (req, res) {

    const data = req.body;

    conexao.query(`INSERT INTO pessoas set ?`, [data],
        function (erro, resultado) {
            if (erro) {
                return res.send(erro);
            }
            console.log(resultado)
            res.json({ sucesso: true });

        });
})

app.get("/pessoas", (req, res) => {
    conexao.query(`SELECT * FROM pessoas`, (erro, listaPessoas) => {
        if (erro) {
            console.log("Deu Errado")
        }

        res.send(listaPessoas)
        console.log("Deu Certo Pessoas")
    })
})


app.get("/pessoas/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM pessoas WHERE id = ?`, [id], (erro, pessoa) => {
        if (erro) {
            console.error(erro)
            return
        }

        res.send(pessoa)
    })
})

app.delete("/pessoas/:id", (req, res) => {
    const idPessoa = req.params.id
    conexao.query(`DELETE FROM pessoas WHERE id = ${idPessoa}`, (erro, resultado) => {
        if (erro) {
            console.error("ERRO AQUI:::::" + erro)
            resultado = { valorResultado: "Errado" }
            res.send(resultado)
            return
        }

        res.send(resultado)
    })
})


app.post("/produtos/", (req, res) => {
    const dados = req.body
    conexao.query("INSERT INTO produtos SET ?", [dados], (erro, resultado) => {
        if (erro) {
            res.json(erro)
        }
        console.log("Deu Certo")
        // res.send(resultado.insertId())
    })
})

app.get("/produtos", (req, res) => {
    conexao.query(`SELECT * FROM produtos`, (erro, listaProdutos) => {
        if (erro) {
            console.log("Deu Errado")
        }

        res.send(listaProdutos)
        console.log("Deu Certo Produtos")
    })
})

app.get("/produtos/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT * FROM produtos WHERE id = ?`, [id], (erro, produto) => {
        if (erro) {
            console.error(erro)
            return
        }

        res.send(produto)
    })
})

app.get("/produtos/imei/:imeiProduto", (req, res) => {
    const imei = req.params.imeiProduto

    conexao.query(`SELECT * FROM produtos WHERE imei = ${imei}`, (erro, produto) => {
        if (erro) {
            console.error(erro)
            return
        }

        res.send(produto)
    })
})

app.delete("/produtos/:id", (req, res) => {
    const idProduto = req.params.id
    conexao.query(`DELETE FROM produtos WHERE id = ${idProduto}`, (erro, resultado) => {
        if (erro) {
            console.error("ERRO AQUI:::::" + erro)
            return
        }

        res.send(resultado)
    })
})

app.put("/produtos/:id", (req, res) => {
    const idProduto = req.params.id
    const dados = req.body

    conexao.query(`UPDATE produtos SET ? WHERE id = ${idProduto}`, [dados], (erro, resultado) => {
        if (erro) {
            console.error("ERRO AQUI::::::" + erro)
            return
        }

        console.log(resultado)
    })
})

app.get("/produtos-precificacao", (req, res) => {
    console.log("Resultado")
    conexao.query(`SELECT SUM(valor) AS soma FROM produtos`, (erro, resultado) => {
        if (erro) {
            console.error("Erro Aqui::::" + erro)
            return
        }
        console.log("Resultado")
        console.dir(resultado)
        res.json(resultado)
    })
})

app.get("/inventarios", (req, res) => {
    conexao.query(`SELECT 
        produtoDisponivel.id as idDisponivel,
        pessoas.id,
        pessoas.nome,
        pessoas.telefone,
        pessoas.filial,
        produtos.id,
        produtos.equipamento,
        produtos.modelo,
        produtos.serie,
        produtos.nrolinha
        FROM produtoDisponivel 
        INNER JOIN pessoas ON produtoDisponivel.id_pessoa = pessoas.id 
        INNER JOIN produtos ON produtoDisponivel.id_produto = produtos.id
        `, (erro, lista_inventarios) => {
        if (erro) {
            console.error("Erro Aqui:::::" + erro)
            return
        }

        res.send(lista_inventarios)
    })
})

app.post("/inventariar", (req, res) => {
    const dados = req.body
    conexao.query(`INSERT INTO produtoDisponivel set ?`, [dados], (erro, resultado) => {
        if (erro) {
            return
        }

        conexao.query(`UPDATE produtos SET disponivel = ? WHERE id = ?`, ["N", dados.id_produto])
        res.send(resultado)
    })
})

app.get("/pessoas-codigo/:codigo", (req, res) => {
    const codigoPessoa = req.params.codigo
    conexao.query(`SELECT * FROM pessoas where codPessoa = ${codigoPessoa}`, (erro, resultadoPessoa) => {
        if (erro) {
            console.error("Erro Aqui::::" + erro)
            return
        }

        res.send(resultadoPessoa)
    })
})

app.get("/inventario/:id", (req, res) => {
    const id = req.params.id
    conexao.query(`SELECT 
        produtoDisponivel.id as idDisponivel,
        pessoas.id,
        pessoas.nome,
        pessoas.telefone,
        pessoas.filial,
        produtos.id,
        produtos.equipamento,
        produtos.modelo,
        produtos.serie,
        produtos.nrolinha
        FROM produtoDisponivel 
        INNER JOIN pessoas ON produtoDisponivel.id_pessoa = pessoas.id 
        INNER JOIN produtos ON produtoDisponivel.id_produto = produtos.id
        WHERE idDisponivel = ${id}
        `, (erro, lista_inventarios) => {
        if (erro) {
            console.error("Erro Aqui:::::" + erro)
            return
        }

        res.send(lista_inventarios)
    })
})

app.listen(3000)