const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crudExample",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conectado ao MySQL");
  }
});

// Rota para criar usuário
app.post("/api/createUser", (req, res) => {
  const { username, password } = req.body;
  const query = "INSERT INTO Users (username, password) VALUES (?, ?)"; 
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error("Erro ao criar usuário:", err);
      res.status(500).send("Erro ao criar usuário");
    } else {
      console.log("Usuário criado com sucesso");
      res.send(result);
    }
  });
});

// Rota para buscar usuários
app.get("/api/readUsers", (req, res) => {
  const query = "SELECT * FROM Users";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Rota para atualizar usuário
app.put("/api/updateUser/:id", (req, res) => {
  const id = req.params.id;
  const { username, password } = req.body;
  const query = "UPDATE Users SET username = ?, password = ? WHERE id = ?";
  db.query(query, [username, password, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).send("Erro ao atualizar usuário");
    } else {
      console.log("Usuário atualizado com sucesso");
      res.send(result);
    }
  });
});

// Rota para deletar usuários deleteUser
app.delete("/api/deleteUsers/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Users WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM Users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Erro ao realizar login:", err);
      res
        .status(500)
        .send("Erro ao realizar login. Por favor, tente novamente mais tarde.");
    } else {
      if (results.length > 0) {
        res.status(200).send("Login bem-sucedido");
      } else {
        res.status(401).send("Credenciais incorretas");
      }
    }
  });
});

app.listen(port, () => {
  console.log("----Login (MySQL version)-----");
  console.log(`Servidor rodando na porta ${port}`);
});
