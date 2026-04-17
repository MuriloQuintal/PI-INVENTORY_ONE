# Sistema Inventory One

## Visão geral

Inventory One é um sistema integrador de inventário empresarial feito para controlar funcionários, produtos, equipamentos e o vínculo desses itens com pessoas. O projeto oferece um backend em Node.js/Express com uma interface frontend em HTML/CSS/JavaScript.

## Funcionalidades principais

- Cadastro de usuários e autenticação
- Cadastro e gerenciamento de pessoas
- Cadastro e gerenciamento de produtos/equipamentos
- Inventário de produtos vinculados a pessoas
- Consulta de produtos por IMEI
- Dashboard e relatórios básicos

## Tecnologias utilizadas

- Node.js
- Express
- MySQL / MariaDB
- HTML, CSS, JavaScript
- bcrypt
- dotenv
- cors
- body-parser
- nodemon (desenvolvimento)

## Estrutura do projeto

- `BACKEND/` — servidor Express e rotas
- `banco_dados/` — scripts e conexão com o banco de dados
- `frontend/` — telas HTML, estilos CSS e scripts JavaScript
- `routes/` — rotas da API (organização adicional)
- `package.json` — dependências e comandos de execução
- `env-exemplo` — modelo de variáveis de ambiente

## Pré-requisitos

- Node.js instalado (recomenda-se versão 18+)
- npm instalado
- MySQL ou MariaDB funcionando
- Editor ou navegador para abrir o frontend

## Configuração do banco de dados

1. Crie um banco de dados MySQL/MariaDB.
2. Importe as tabelas e dados disponíveis em `banco_dados/dump-inventoryone-202604081814.sql` ou use seu próprio script de criação.
3. Crie um arquivo `.env` na raiz do projeto copiando o arquivo `env-exemplo`:

```bash
copy env-exemplo .env
```

4. Preencha as variáveis no `.env` com os valores do seu servidor MySQL:

```env
HOST=localhost
USER=seu_usuario
PASSWORD=sua_senha
PORT=3306
DATABASE=nome_do_banco
```

## Instalação

No diretório raiz do projeto, execute:

```bash
npm install
```

## Executando o servidor

- Para rodar em modo normal:

```bash
npm start
```

- Para rodar em modo de desenvolvimento com reinício automático:

```bash
npm run dev
```

O backend escuta na porta `10000`.

## Acessando o frontend

Atualmente o frontend é composto por arquivos estáticos em `frontend/html/`.

- Abra `frontend/html/login.html` no navegador
- Ou use uma extensão como Live Server para servir os arquivos locais

## Endpoints principais da API

- `POST /cadastrousuarios/` — cria usuário
- `POST /login/` — autentica usuário
- `POST /pessoas/` — cadastra pessoa
- `GET /pessoas` — lista pessoas
- `GET /pessoas/:id` — busca pessoa por ID
- `PUT /pessoas/:id` — atualiza pessoa
- `DELETE /pessoas/:id` — remove pessoa
- `POST /produtos/` — cadastra produto
- `GET /produtos` — lista produtos
- `GET /produtos/:id` — busca produto por ID
- `DELETE /produtos/:id` — remove produto
- `PUT /produtos/:id` — atualiza produto
- `GET /inventarios` — lista inventários
- `POST /inventariar` — registra inventário/vínculo de produto
- `DELETE /inventario/:id` — remove inventário

## Observações importantes

- Certifique-se de que a conexão MySQL esteja correta antes de iniciar o servidor.
- O projeto utiliza variáveis de ambiente em `banco_dados/db.js`.
- Se o backend e o frontend estiverem rodando localmente, ajuste chamadas JavaScript para `http://localhost:10000` quando necessário.

## Sugestões rápidas

- Use o arquivo `env-exemplo` como base para criar o `.env`.
- Se quiser, instale `Live Server` no VS Code para abrir o frontend sem abrir os arquivos diretamente.
- Verifique se a tabela `usuarios` existe no banco antes de testar o login.

- serie: varchar
- nrolinha: varchar
- codchip: varchar
- operadora: varchar
- pinoperadora: varchar
- configuracao: varchar
- disponivel: Enum  // "S" ou "N"
-----------------------------
+ cadastrar()
+ atualizar()
+ excluir()
+ buscarPorId()
`


Classe ProdutoDisponivel
-------------------------------------
- id: int (PK)
- id_pessoa: int (FK)
- id_produto: int (FK)
-------------------------------------
+ vincularProduto()
+ desvincularProduto()
+ listarInventario()

Classe Usuario
-----------------------------
- id: int (PK)
- nome: varchar
- telefone: varchar
- email: varchar
- senha: varchar (hash)
- dataCadastro: DateTime
-----------------------------
+ autenticar()
+ logout()

# Fluxogramas
## Cadastrar Usuário
Início
  ↓
Usuário preenche formulário
  ↓
Validação no Frontend (campos obrigatórios)
  ↓
Campos válidos?
 ├── Não → Exibir mensagens de erro
 └── Sim
        ↓
Enviar requisição POST /usuarios
        ↓
Backend recebe dados
        ↓
Validação no Backend
        ↓
Dados válidos?
 ├── Não → Retornar erro
 └── Sim
        ↓
Inserir no banco (usuarios)
        ↓
Retornar sucesso (200)
        ↓
Frontend exibe mensagem de sucesso
        ↓
Fim

## Cadastrar Produtos
Início
  ↓
Usuário preenche formulário
  ↓
Validação no Frontend
  ↓
Campos válidos?
 ├── Não → Exibir erro
 └── Sim
        ↓
Enviar requisição POST /produtos
        ↓
Backend valida dados
        ↓
Dados válidos?
 ├── Não → Retornar erro
 └── Sim
        ↓
Inserir no banco (produtos)
        ↓
Atualizar disponibilidade = "S"
        ↓
Retornar sucesso
        ↓
Frontend atualiza lista de produtos
        ↓
Fim

## Cadastrar Pessoas
Início
  ↓
Usuário preenche formulário
  ↓
Validação no Frontend
  ↓
Campos válidos?
 ├── Não → Exibir erro
 └── Sim
        ↓
Enviar requisição POST /pessoas
        ↓
Backend recebe dados
        ↓
Validação no Backend
        ↓
Dados válidos?
 ├── Não → Retornar erro
 └── Sim
        ↓
Inserir no banco (pessoas)
        ↓
Retornar sucesso
        ↓
Frontend exibe confirmação
        ↓
Fim