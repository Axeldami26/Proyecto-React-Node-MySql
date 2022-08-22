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

app.get('/user/:nombre/:contrasena', (req, res) => {
  console.log("llegaron los datos")
  console.log(req.params)
  const consulta = `SELECT id FROM usuarios WHERE nombre = '${req.params.nombre}' and contrasena = '${req.params.contrasena}'`;
  console.log(consulta, `add tas`);
  connection.query(consulta, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/addtask', (req, res) => {
  const ADD_TASK = `INSERT INTO task (task, userid, date) VALUES ('${req.body.task}', ${req.body.id}, '${req.body.date}')`;
  console.log(ADD_TASK, `add tas`);
  connection.query(ADD_TASK, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

app.post('/user/register', (req, res) => {
  const insert= `INSERT INTO usuarios (nombre,contrasena) VALUES ('${req.body.nombre}', '${req.body.contrasena}')`;
  console.log(insert, `add tas`);
  connection.query(insert, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send('added');
    }
  });
});

 
app.delete('/task/:taskid', (req, res) => {
  const DELETE_TASK = `DELETE FROM task WHERE (taskid = ${req.params.taskid});`;
  connection.query(DELETE_TASK, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send('deleted');
    }
  });
});

app.listen(4000, () => {
  console.log('server up');
});
