const express = require("express");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensagem: "API de alunos funcionando!" });
});

app.get("/alunos", (req, res) => {
    const alunos = db.prepare(
        "SELECT * FROM alunos ORDER BY id"
    ).all();

    res.json(alunos);
});

app.get("/alunos/:id", (req, res) => {
    const aluno = db.prepare(
        "SELECT * FROM alunos WHERE id = ?"
    ).get(req.params.id);

    if (!aluno) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(aluno);
});

app.post("/alunos", (req, res) => {
    const { nome, idade, email } = req.body;

    if (
        typeof nome !== "string" ||
        !nome.trim() ||
        !Number.isInteger(idade) ||
        idade < 0 ||
        typeof email !== "string" ||
        !email.trim()
    ) {
        return res.status(400).json({
            erro: "Informe nome, idade válida e email"
        });
    }

    try {
        const resultado = db.prepare(`
            INSERT INTO alunos (nome, idade, email)
            VALUES (?, ?, ?)
        `).run(nome.trim(), idade, email.trim());

        const aluno = db.prepare(
            "SELECT * FROM alunos WHERE id = ?"
        ).get(resultado.lastInsertRowid);

        res.status(201).json(aluno);
    } catch (erro) {
        if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                erro: "Este email já está cadastrado"
            });
        }

        console.error(erro);
        res.status(500).json({ erro: "Erro ao cadastrar aluno" });
    }
});

app.put("/alunos/:id", (req, res) => {
    const { nome, idade, email } = req.body;

    if (
        typeof nome !== "string" ||
        !nome.trim() ||
        !Number.isInteger(idade) ||
        idade < 0 ||
        typeof email !== "string" ||
        !email.trim()
    ) {
        return res.status(400).json({
            erro: "Informe nome, idade válida e email"
        });
    }

    try {
        const resultado = db.prepare(`
            UPDATE alunos
            SET nome = ?, idade = ?, email = ?
            WHERE id = ?
        `).run(nome.trim(), idade, email.trim(), req.params.id);

        if (resultado.changes === 0) {
            return res.status(404).json({
                erro: "Aluno não encontrado"
            });
        }

        const aluno = db.prepare(
            "SELECT * FROM alunos WHERE id = ?"
        ).get(req.params.id);

        res.json(aluno);
    } catch (erro) {
        if (erro.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                erro: "Este email já está cadastrado"
            });
        }

        console.error(erro);
        res.status(500).json({ erro: "Erro ao atualizar aluno" });
    }
});

app.delete("/alunos/:id", (req, res) => {
    const resultado = db.prepare(
        "DELETE FROM alunos WHERE id = ?"
    ).run(req.params.id);

    if (resultado.changes === 0) {
        return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Servidor disponível em http://localhost:${PORT}`);
});
