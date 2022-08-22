import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./App.css";
import TaskManager from "./Component/TaskManager";
function App() {
  const [user, setUser] = useState({
    id: "",
    nombre: "",
    contrasena: "",
  });
  useEffect(() => {
    console.log(user);
  }, [user]);

  const loginClick = () => {
    console.log(user);
    axios
      .get(`http://localhost:4000/user/${user.nombre}/${user.contrasena}`)
      .then((res) => {
        console.log(res);
        res.data[0]?.id ? setUser({ ...user, id: res.data[0].id }) : alert("No estas registrado");
      });
  };
  const registerClick = () => {
    axios
      .get(`http://localhost:4000/user/${user.nombre}/${user.contrasena}`)
      .then((res) => {
        if (!res.data[0]) {
          axios.post(`http://localhost:4000/user/register`, {
              nombre: user.nombre,
              contrasena: user.contrasena,
            })
            .then((response) => {
              alert("Registrado exitosamente")
            });
        }
        else{
          alert("ya esta registrado")
        }
      });
  };

  return (
    !user.id ?
    <div className="App">
      <div className="ui input">
        <input
          type="text"
          value={user.nombre}
          onChange={(e) => setUser({ ...user, nombre: e.target.value })}
          placeholder="nombre"
        ></input>
        <input
          type="password"
          value={user.contrasena}
          onChange={(e) => setUser({ ...user, contrasena: e.target.value })}
          placeholder="contraseña"
        ></input>
      </div>
      <div>
        <button
          className="ui primary basic button"
          onClick={() => loginClick()}
        >
          Login
        </button>
        <button
          className="ui primary basic button"
          onClick={() => registerClick()}
        >
          Register
        </button>
      </div>
      </div>
      :
      <div className="App">
      <button
          className="ui primary basic button"
          onClick={() => setUser({id:""}) }
        >
          Log Out
        </button>
      <TaskManager props={user} />
    </div>
  );
}

export default App;
