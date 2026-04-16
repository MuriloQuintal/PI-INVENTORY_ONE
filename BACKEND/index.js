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

app.put("/pessoas/:id", (req, res) => {
    const idPessoa = req.params.id
    const dados = req.body

    conexao.query(`UPDATE pessoas SET ? WHERE id = ${idPessoa}`, [dados], (erro, resultado) => {
        if (erro) {
            console.error("ERRO AQUI::::::" + erro)
            res.sendStatus(500)
            return
        }

        res.sendStatus(200)
        console.log(resultado)
    })
})

app.post("/produtos/", (req, res) => {
    const dados = req.body
    conexao.query("INSERT INTO produtos SET ?", [dados], (erro, resultado) => {
        if (erro) {
        //     res.json(erro)
        // }
        // console.log("Deu Certo")
        //  res.send(resultado.insertId())

              return res.json(erro)
        }

        console.log("Deu Certo")
        return res.json({ sucesso: true })
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
            res.sendStatus(500)
            return
        }

        res.sendStatus(200)
    })
})

app.put("/produtos/:id", (req, res) => {
    const idProduto = req.params.id
    const dados = req.body

    conexao.query(`UPDATE produtos SET ? WHERE id = ${idProduto}`, [dados], (erro, resultado) => {
        if (erro) {
            console.error("ERRO AQUI::::::" + erro)
            res.sendStatus(500)
            return
        }

        res.sendStatus(200)
        console.log(resultado)
    })
})

app.get("/produtos-precificacao", (req, res) => {
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

app.get("/produtos/agrupamentos/:equipamento/:disponibilidade", (req, res) => {
    const dados = req.params
    conexao.query(`SELECT * FROM produtos WHERE LOWER(equipamento) = LOWER(?) AND disponivel = ?`, [dados.equipamento, dados.disponibilidade], (erro, resultado) => {
        if (erro) {
            console.error("Erro Aqui::::" + erro)
            return
        }
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
        produtos.imei
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
        pessoas.id,
        pessoas.nome,
        pessoas.telefone,
        pessoas.email,
        pessoas.departamento,
        pessoas.filial,
        produtos.id,
        produtos.equipamento,
        produtos.modelo,
        produtos.configuracao,
        produtos.responsavelestoque,
        produtos.dtacompra,
        produtos.valor,
        produtos.serie,
        produtos.imei,
        produtos.nrodocumento,
        produtos.ean,
        produtos.marca,
        produtos.nrolinha
        FROM produtoDisponivel 
        INNER JOIN pessoas ON produtoDisponivel.id_pessoa = pessoas.id 
        INNER JOIN produtos ON produtoDisponivel.id_produto = produtos.id
        WHERE  produtoDisponivel.id = ${id}
        `, (erro, lista_inventarios) => {
        if (erro) {
            console.error("Erro Aqui:::::" + erro)
            return
        }

        res.send(lista_inventarios)
    })
})

app.delete("/inventario/:id", (req, res) => {
    const idInventario = req.params.id

    conexao.query(`SELECT id_produto FROM produtoDisponivel WHERE id = ?`, [idInventario], (erro, resultado) => {
        if (erro) {
            console.error("Erro Aqui::::", erro)
            return
        }
        const idProduto = resultado[0].id_produto

        conexao.query(`DELETE FROM produtoDisponivel WHERE id = ${idInventario}`, (erroDelete, resultadoDelete) => {
            if (erroDelete) {
                console.error("ERRO AQUI:::::" + erro)
                resultadoDelete = { valorResultado: "Errado" }
                res.send(resultadoDelete)
                return
            }


            conexao.query(
                `UPDATE produtos SET disponivel = 'S' WHERE id = ?`, [idProduto], (erroAtualizacao, resultado) => {
                    if (erroAtualizacao) {
                        console.error("ERRO AQUI::::" + erroAtualizacao)
                        return
                    }
                })

            res.sendStatus(200)
        })

    })
})

app.get("/produtos/agrupamentos/dashboard", (req, res) => {
    console.log("ROTA /produtos/dashboard CHAMADA")

    conexao.query(` SELECT 
            LOWER(equipamento) AS nome,
            COUNT(*) AS qtdTotal
        FROM produtos
        GROUP BY LOWER(equipamento)`, (erro, resultado) => {

        if (erro) {
            console.error("Erro Aqui::::" + erro)
            res.sendStatus(500)
            return
        }

        // console.log("RESULTADO QUERY:", resultado)
        res.send(resultado)
    })
})

app.listen(10000)