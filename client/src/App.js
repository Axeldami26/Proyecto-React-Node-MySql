import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./App.css";
import TaskManager from "./Component/TaskManager";
import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  const [user, setUser] = useState({
    id: "",
    nombre: "",
    contrasena: "",
  });
  const [modal, setModal] = useState({
    isOpen: false,
    contrasenaOld: "",
    newConstrasena1: "",
    newConstrasena2: "",
  });

  const handleModal = () =>
    modal.isOpen
      ? setModal({ ...modal, isOpen: false })
      : setModal({ ...modal, isOpen: true });

  useEffect(() => {
    console.log(user);
  }, [user]);

  const loginClick = () => {
    console.log(user);
    axios
      .get(`http://localhost:4000/${user.nombre}/${user.contrasena}`)
      .then((res) => {
        console.log(res);
        res.data[0]?.id
          ? setUser({ ...user, id: res.data[0].id })
          : alert("No estas registrado");
      });
  };
  const registerClick = () => {
    axios
      .get(`http://localhost:4000/${user.nombre}/${user.contrasena}`)
      .then((res) => {
        if (!res.data[0]) {
          axios
            .post(`http://localhost:4000/register`, {
              nombre: user.nombre,
              contrasena: user.contrasena,
            })
            .then((res) => {
              alert("Registrado exitosamente");
            });
        } else {
          alert("ya esta registrado");
        }
      });
  };

  const changePasswordClick = () => {
    if(!modal.contrasenaOld || !modal.newConstrasena1 || !modal.newConstrasena2){
      alert("Hay datos en blanco")
    }
    else if(modal.contrasenaOld !== user.contrasena){
      alert("Ingreso mal su antigua contraseña")
    } 
    else if (modal.newConstrasena1 !== modal.newConstrasena2){
      alert("Sus contraseñas no coinciden")
    } 
    else{
    axios
      .put(`http://localhost:4000/password`, {
        id: user.id,
        contrasena: modal.newConstrasena1,
      })
      .then((res) => {
        alert("constraseñna cambiada exitosamente");
        handleModal();
        setUser({ id: "",contrasena:"" })
      });
    }
  };

  return !user.id ? (
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
  ) : (
    <div className="App">
      <button
        className="ui primary basic button"
        onClick={() => setUser({ id: "" })}
      >
        Log Out
      </button>
      <button className="ui primary basic button" onClick={() => handleModal()}>
        Cambiar Contraseña
      </button>
      <Modal style={customStyles} isOpen={modal.isOpen}>
        <div>
          <h2 style={{ marginLeft: "10px" }}>Cambiar Contraseña</h2>
          <h5 style={{ marginLeft: "10px" }}>Al cambiar su contraseña se cerrara su sesion</h5>
          <h5 style={{ marginLeft: "10px",color: "red" }}>{! (modal.newConstrasena1===modal.newConstrasena2) ? "Las contraseña deben ser iguales" : ""}</h5>
          <div className="ui input">
            <input
              style={{ marginLeft: "10px" }}
              type="password"
              value={modal.contrasenaOld}
              onChange={(e) =>
                setModal({ ...modal, contrasenaOld: e.target.value })
              }
              placeholder="Vieja Contraseña"
            ></input>
            <input
              style={{ marginLeft: "10px" }}
              type="password"
              value={modal.newConstrasena1}
              onChange={(e) =>
                setModal({ ...modal, newConstrasena1: e.target.value })
              }
              placeholder="Nueva Contraseña"
            ></input>
            <input
              style={{ marginLeft: "10px" }}
              type="password"
              value={modal.newConstrasena2}
              onChange={(e) =>
                setModal({ ...modal, newConstrasena2: e.target.value })
              }
              placeholder="Confirme Contraseña"
            ></input>
          </div>
          <br></br>
          <button
            style={{ marginLeft: "10px",marginTop: "10px" }}
            className="ui primary basic button"
            onClick={() => handleModal()}
          >
            Cancelar
          </button>
          <button
             style={{ marginLeft: "10px",marginTop: "10px" }}
            className="ui primary basic button"
            onClick={() => changePasswordClick()}
          >
            Guardar
          </button>
        </div>
      </Modal>
      <TaskManager props={user} />
    </div>
  );
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default App;
