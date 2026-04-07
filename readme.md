# Sistema Inventory One
### Sobre o Projeto
Este projeto foi desenvolvido com o objetivo de facilitar o controle e a organização dos recursos internos de uma empresa.

A ideia surgiu da necessidade de ter uma visão clara sobre:

Quais funcionários fazem parte da empresa
Em quais filiais eles estão alocados
Quais equipamentos estão em uso
E quais itens ainda estão disponíveis em estoque

Com isso, o sistema atua como um inventário inteligente, centralizando todas essas informações em um único lugar, tornando a gestão mais simples, rápida e eficiente.

### Funcionalidades
O sistema conta com diversas funcionalidades voltadas para o dia a dia de uma empresa:
- Cadastro e gerenciamento de funcionários
- Controle de filiais
- Registro de equipamentos/componentes
- Associação de equipamentos aos funcionários
- Controle de itens disponíveis em estoque
- Dashboard com visão geral da empresa

### Objetivo
O principal objetivo deste projeto é oferecer uma solução prática para o gerenciamento de ativos empresariais, evitando perdas, melhorando a organização e facilitando a tomada de decisões.

Além disso, este projeto também faz parte de um projeto integrador acadêmico, com foco no desenvolvimento de habilidades práticas como:

- Desenvolvimento Full Stack
- Modelagem de banco de dados
- Organização de sistemas reais
- Boas práticas de programação

### Tecnologias Utilizadas
- BackEnd - Node.js com Express
- FrontEnd - Html / Css / JavaScript / BootStrap
- Banco de Dados: MySql (Maria DB)
- Blibliotecas Como: DotEnv, Cors, Nodemon, body-parser, express, mysql


## Estrutura Atual Do Projeto

Inventario_Empresarial/
├── 🔧 .env                          # Variáveis de ambiente (configuração do banco, portas, etc.)
├── 📋 .env-exemplo                  # Modelo de configuração para novos ambientes
├── 🚫 .gitignore                    # Arquivos ignorados pelo Git
├── 📦 package.json                  # Configuração do projeto Node.js
├── 📦 package-lock.json             # Controle de dependências
├── 📖 README.md                     # Documentação do projeto

├── 🖥️ BACKEND/                     # Lógica principal da aplicação (Servidor)
│   ├── index.js                    # Arquivo principal da aplicação (inicialização do servidor)

├── 🗄️ banco_dados/                 # Configuração e scripts do banco de dados
│   ├── codigo_criacao_banco.sql    # Script de criação do banco e tabelas
│   ├── conexaoBanco.js             # Configuração de conexão com o banco
│   ├── dump-inventoryone.sql       # Backup/exportação do banco de dados

├── 🔀 routes/                      # Rotas da aplicação (API)
│   ├── cadastro-usuarioRoutes.js   # Rotas para cadastro de usuários
│   ├── loginRoutes.js              # Rotas de autenticação/login
│   ├── dashboardRoutes.js          # Rotas do dashboard
│   ├── inventarioRoutes.js         # Rotas principais do inventário
│   ├── inventarioRoutes.js         # Rotas relacionadas aos itens do inventário
│   ├── pessoasRoutes.js            # Rotas de funcionários/pessoas
│   ├── produtoRoutes.js            # Rotas de produtos/componentes

├── 🎨 frontend/                    # Interface do sistema
│   ├── css/                        # Arquivos de estilo
│   ├── html/                       # Páginas HTML do sistema
│   ├── js/                         # Scripts JavaScript (frontend)
│   ├── img/                        # Imagens do sistema

├── 🔤 fonts/                       # Fontes utilizadas no projeto

├── 📦 node_modules/                # Dependências instaladas (gerado automaticamente)

├── ⚙️ .vscode/                     # Configurações do ambiente de desenvolvimento


# UML(Caso de Uso)

`
[Usuário]
   |
   |----> (Buscar Produto)
   |----> (Buscar Pessoa)
   |----> (Inventariar Produto)
   |----> (Atualizar Status Produto)

`

`
[Login]
   |
   |----> (Acessar Tela de Login)
   |----> (Inserir Email e Senha)
   |----> (Validar Credenciais)
   |----> (Autenticar Usuário)
   |----> (Acessar Sistema)

`

`
[CadastroUsuario]
   |
   |----> (Acessar Cadastro de Funcionários)
   |----> (Preencher Dados da Pessoa)
   |----> (Validar Dados)
   |----> (Cadastrar Pessoa)
   |----> (Listar Pessoas)

`

`
[CadastroProduto]
   |
   |----> (Acessar Cadastro de Produtos)
   |----> (Preencher Dados do Produto)
   |----> (Validar Dados)
   |----> (Cadastrar Produto)
   |----> (Definir Disponibilidade)
   |----> (Listar Produtos)

`

`
[Inventario]
   |
   |----> (Acessar Tela de Inventário)
   |----> (Solicitar Lista)
   |----> (Visualizar Produtos Vinculados)
   |----> (Ver Detalhes do Produto)

`

`
[Inventariar]
   |
   |----> (Buscar Produto por IMEI)
   |----> (Buscar Pessoa por Código)
   |----> (Validar Disponibilidade do Produto)
   |----> (Vincular Produto à Pessoa)
   |----> (Atualizar Status do Produto)
   |----> (Confirmar Operação)

`

`
[DeletarProduto]
   |
   |----> (Acessar Inventário)
   |----> (Selecionar Produto Vinculado)
   |----> (Remover Vínculo)
   |----> (Atualizar Disponibilidade do Produto)
   |----> (Confirmar Remoção)

`

`
[Dashboard]
   |
   |----> (Acessar Dashboard)
   |----> (Visualizar Total de Produtos)
   |----> (Visualizar Produtos Disponíveis)
   |----> (Visualizar Produtos em Uso)
   |----> (Visualizar Funcionários)
   
`

# UML(Classes)
Classe Pessoa
-----------------------------
- id: int (PK)
- nome: varchar
- telefone: varchar
- filial: varchar
- sexo: Enum
- nacionalidade: varchar
- nascimento: date
- departamento: varchar
- cargo: varchar
- endereço: varchar
- cep: varchar
- codigoPessoa: int
-----------------------------
+ cadastrar()
+ atualizar()
+ excluir()
+ buscarPorId()
`

Classe Produto
-----------------------------
- id: int (PK)
- equipamento: varchar
- responsavel: varchar
- localestoque: varchar
- marca: varchar
- modelo: varchar
- imei: varchar
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