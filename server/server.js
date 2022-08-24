const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require(`./db`)

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks/:id', (req, res) => {
  const SELECT_ALL_TASKS = `SELECT * FROM task WHERE userid = ${req.params.id} `;
  console.log(SELECT_ALL_TASKS, `add tas`);
  connection.query(SELECT_ALL_TASKS, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get('/:nombre/:contrasena', (req, res) => {
  console.log("llegaron los datos")
  console.log(req.params)
  const consulta = `SELECT id FROM usuarios WHERE nombre = '${req.params.nombre}' and contrasena = '${req.params.contrasena}'`;
  connection.query(consulta, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addtask', (req, res) => {
  const consulta = `INSERT INTO task (task, userid, date) VALUES ('${req.body.task}', ${req.body.id}, '${req.body.date}')`;
  connection.query(consulta, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.post('/register', (req, res) => {
  const consulta= `INSERT INTO usuarios (nombre,contrasena) VALUES ('${req.body.nombre}', '${req.body.contrasena}')`;
  connection.query(consulta, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

 
app.delete('/task/:taskid', (req, res) => {
  const consulta = `DELETE FROM task WHERE (taskid = ${req.params.taskid});`;
  connection.query(consulta, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.put('/password', (req, res) => {
  console.log(req)
  const consulta = `UPDATE usuarios SET contrasena = '${req.body.contrasena}' WHERE id = ${req.body.id};`;
  console.log(consulta)
  connection.query(consulta, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('updated');
    }
  });
});

app.listen(4000, () => {
  console.log('server up');
});
