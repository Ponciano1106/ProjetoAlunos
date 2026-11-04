# Projeto Alunos JS

API REST para cadastro de alunos usando Node.js, Express e SQLite.

## Requisitos

- Node.js LTS instalado

## Instalação

Na pasta do projeto, execute:

```bash
npm install
```

## Executar

```bash
npm start
```

O servidor ficará disponível em http://localhost:3000.

O banco `alunos.db` e a tabela `alunos` são criados automaticamente na primeira execução.

## Rotas

| Método | Rota | Função |
|---|---|---|
| GET | `/` | Verificar se a API está funcionando |
| GET | `/alunos` | Listar alunos |
| GET | `/alunos/:id` | Buscar um aluno pelo ID |
| POST | `/alunos` | Cadastrar aluno |
| PUT | `/alunos/:id` | Atualizar aluno |
| DELETE | `/alunos/:id` | Excluir aluno |


