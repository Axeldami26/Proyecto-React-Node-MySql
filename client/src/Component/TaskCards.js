import React from "react";

export const TaskCard = ({ taskList, onDoneClick, onDeleteClick }) => {
  return (
    <div>
      <hr />
      <h4>Tareas:</h4>
      <div className="ui cards">
        {taskList.map((task) => (
          <div className="card">
            <div className="content">
              <div className="date">{task.date}</div>
              <div className="description">{task.task}</div>
            </div>
            <div className="extra content">
              <div className="ui two buttons">
                <div
                  className="ui basic red button"
                  onClick={() => onDeleteClick(task.taskid)}
                >
                  Borrar
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
