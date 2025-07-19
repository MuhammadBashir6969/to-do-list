import { useState, useEffect } from "react";
import styled from "styled-components";
import { Check, Trash2 } from "lucide-react";

const Wrapper = styled.div`
  .body {
    margin: 0;
    background-color: #f5f7fa;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;

    @media (min-width: 600px) {
      padding: 0;
    }
  }

  .To-do-list {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    @media (min-width: 500px) {
      flex-direction: row;
    }
  }

  .input-task {
    width: 100%;
    padding: 1rem;
    font-size: 16px;
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    outline: none;
    transition: border 0.2s ease;
  }

  .input-task:focus {
    border-color: #38b2ac;
  }

  .add-task {
    background-color: #153456;
    border: none;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    width: 100%;

    @media (min-width: 500px) {
      width: auto;
    }
  }

  .Display-tasks {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #eef1f5;
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 15px;
    justify-content: space-between;
  }

  .task-btns {
    display: flex;
    gap: 10px;
  }

  .delete-task,
  .delete-all-tasks {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #007bff;
    transition: transform 0.2s ease;
  }

  .clear-all {
    display: flex;
    justify-content: flex-end;
  }

  .task-done {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #0ddd3d;
    transition: transform 0.2s ease;
  }
`;
function ToDoList() {
  const [task, setTask] = useState("");
  const [addedTask, setAddedTask] = useState([]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(addedTask));
  }, [addedTask]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("todoList");
    if (savedTasks) {
      setAddedTask(JSON.parse(savedTasks));
    }
  }, []);

  const handleNewTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      name: task,
      completed: false,
    };

    setAddedTask([...addedTask, newTask]);

    setTask("");
  };

  const taskDone = (id) => {
    const updateAddedTask = addedTask.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setAddedTask(updateAddedTask);
  };

  const deleteTask = (id) => {
    const updated = addedTask.filter((t) => t.id !== id);
    setAddedTask(updated);
  };

  const clearAllTasks = () => {
    setAddedTask([]);
  };

  return (
    <Wrapper>
      <div className="body">
        <div className="To-do-list">
          <div className="input-field">
            <input
              type="text"
              className="input-task"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="add-task" onClick={handleNewTask}>
              Add Task
            </button>
          </div>

          {addedTask.map((t) => (
            <div key={t.id} className="Display-tasks">
              <p
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  color: t.completed ? "gray" : "black",
                  margin: 0,
                }}
              >
                {t.name}
              </p>
              <div className="task-btns">
                <button className="task-done" onClick={() => taskDone(t.id)}>
                  <Check size={15} />
                </button>
                <button
                  className="delete-task"
                  onClick={() => deleteTask(t.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
          <div className="clear-all">
            <button className="delete-all-tasks" onClick={clearAllTasks}>
              <p>
                Clear all{" "}
                <span>
                  <Trash2 size={15} />
                </span>
              </p>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default ToDoList;
