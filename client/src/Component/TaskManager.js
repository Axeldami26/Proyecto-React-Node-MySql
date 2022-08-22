import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { TaskCard } from "./TaskCards";

const TaskManager = ({props}) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    console.log(props)
    getTaskList();
  }, [props]);

  const onChangeTask = (e) => setTask(e.target.value);
  const onChangeDate = (e) => setDate(e.target.value);

  const onDoneClick = () => onDeleteClick;

  const showSignInError = () => (
    <div className="ui red message">Nesesitas logearte primero !</div>
  );

  const onSubmitClick = () => {
    
    axios
      .post(`http://localhost:4000/addtask`, {
        task:task,
        id:props.id,
        date:date,
      })
      .then(() => {
        getTaskList();
        setDate("");
        setTask("");
      });
  };

  const getTaskList = () => {
    axios
      .get(`http://localhost:4000/tasks/${props.id}`)
      .then((respose) => respose.data)
      .then((respose) => setTaskList(respose));
  };

  const onDeleteClick = (taskid) => {
    axios
      .delete(`http://localhost:4000/task/${taskid}`, {
        method: "DELETE",
      })
      .then(() => getTaskList());
  };

  return(
    props.id?
  <div>
    <h3 style={{ padding: `20px` }}>
      Hola!
      <span style={{ color: `#6185d3` }}> {props.nombre}</span>! Añade tus tareas
      del dia
    </h3>
    <div className="ui input">
      <input
        type="text"
        value={date}
        onChange={(e) => onChangeDate(e)}
        placeholder="fecha..."
      ></input>
      <input
        type="text"
        value={task}
        onChange={(e) => onChangeTask(e)}
        placeholder="Tarea..."
      ></input>
    </div>
    <button className="ui primary basic button" onClick={() => onSubmitClick()}>
      Submit
    </button>
    <TaskCard
      onChangeTask={onChangeTask}
      onChangeDate={onChangeDate}
      onDeleteClick={onDeleteClick}
      onSubmitClick={onSubmitClick}
      taskList={taskList}
      task={task}
      date={date}
      onDoneClick={onDoneClick}
    />
  </div>
  :""
  )
};


export default TaskManager;