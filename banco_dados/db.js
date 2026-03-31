let mysql = require('mysql')

let conexao = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    port:`${process.env.PORT}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
})

conexao.connect(function (erro) {
    if (erro) {
        console.log("Deu ruim na conexão \n");
        throw erro;
    } else {
        console.log("Conexão deu bom \n")
    }
})

module.exports = conexao