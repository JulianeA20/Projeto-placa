const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.post("/test", (req, res) => {
  res.send("Rota POST de teste funcionando!");
});

const upload = multer({ dest: 'temp/' });

app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  exec(`python plate_recognition.py ${imagePath}`, (error, stdout, stderr) => {
    fs.unlink(imagePath, (erro) => {
      if (erro) {
        console.error("Erro ao apagar o arquivo: ", erro);
      }
    });

    if (error) {
      return res.status(500).send(`Erro no script Python: ${stderr}`);
    }

    res.send(`Placa reconhecida: ${stdout.trim()}`);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});