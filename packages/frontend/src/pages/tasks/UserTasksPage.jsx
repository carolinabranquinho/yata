import React, { useState } from "react";
import "../pages.css";
import {
  getUserTasks,
  deleteUserTask,
  updateUserTask,
  createUserTask,
  completeUserTask,
} from "../../utils/data/users";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";
import TasksTable from "../../components/ResourceTable";

function useTaskList(id) {
  const [loading, setLoading] = useState(true);
  const [loadedTasks, setLoadedTasks] = useState([]);

  React.useEffect(() => {
    getUserTasks(id).then((responseTasks) => {
      setLoadedTasks(responseTasks);
      setLoading(false);
    });
  }, []);

  return { tasks: loadedTasks, loading };
}

function UsersTasksPage() {
  const { id: userId } = useParams();
  const { tasks: loadedTasks, loading } = useTaskList(userId);

  const [tasks, setTasks] = useState([]);
  React.useEffect(() => {
    if (!loading) {
      setTasks(loadedTasks);
    }
  }, [loading, loadedTasks]);

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteUserTask(userId, id);
  };

  const editTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id == editedTask.id ? editedTask : task))
    );
    updateUserTask(userId, editedTask);
  };

  const createTask = (task) => {
    const id = tasks.length + 1;
    const newTask = { id, ...task, state: "to do" };
    setTasks([...tasks, newTask]);
    createUserTask(userId, task);
  };

  const completeTask = (completedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id == completedTask.id ? { ...task, state: "done" } : task
      )
    );
    completeUserTask(userId, completedTask);
  };

  const completedTasks = tasks.filter((task) => task.state === "done");
  const toDoTasks = tasks.filter((task) => task.state === "to do");

  console.log(tasks, loading);
  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h1> To Do List </h1>
          <TasksTable
            resources={toDoTasks}
            attributes={["description"]}
            onDelete={removeTask}
            onUpdate={editTask}
            onCreate={createTask}
            extraActions={[
              {
                icon: "https://img.icons8.com/fluent/48/000000/checkmark.png",
                description: "complete task",
                onClick: completeTask,
              },
            ]}
          />
          <div className="container">
            <h1> Done </h1>
            <ul>
              {completedTasks.map((task) => (
                <li className="completedTask" key={task.id}>
                  {task.description}
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default UsersTasksPage;
