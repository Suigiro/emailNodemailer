require("dotenv").config();
const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

const email = process.env.EMAIL_TO

app.post('/send-email', async(req, res) => {
    try{
      const {subject, data} = req.body;
      const responseEmail = await transporter.sendMail({
        from: email,
        to: email,
        subject,
        text: `Nome: ${data.nome} - Email: ${data.email} - Mensagem: ${data.mensagem}`,
        html: `<div>Nome: ${data.nome}</div><div>Email: ${data.email}</div><div>Mensagem: ${data.mensagem}</div>`
      });
      res.status(200).json({responseEmail})
    }catch(err){
      res.status(400).json(err.message)
    }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});