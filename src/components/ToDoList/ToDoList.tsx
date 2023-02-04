import React, { useEffect, useState } from "react";
import { Todo } from "../../@types/Todo.type";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";

function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTask, setCurrentTask] = useState<Todo | null>(null);
  const doneTodos = todos.filter((todo) => todo.done);
  const onGoingTodos = todos.filter((todo) => !todo.done);
  const addTodo = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    };
    setTodos((prevState: Todo[]) => [...prevState, todo]);
  };

  const handleCheckTodo = (id: string, done: boolean) => {
    setTodos((prevState) => {
      return prevState.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  };

  const startEditTodo = (id: string) => {
    const foundTodo = todos.find((todo) => todo.id === id);
    if (foundTodo) {
      setCurrentTask(foundTodo);
    }
  };

  const editTodo = (name: string) => {
    setCurrentTask((prevState) => {
      if (prevState) return { ...prevState, name };
      return null;
    });
  };

  const finishEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === currentTask?.id) {
          return currentTask;
        }
        return todo;
      });
    });
    setCurrentTask(null);
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div className={styles.todoList}>
      <TaskInput
        addTodo={addTodo}
        currentTask={currentTask}
        editTask={editTodo}
        finishEditTodo={finishEditTodo}
      ></TaskInput>
      <TaskList
        todos={onGoingTodos}
        doneTaskList={false}
        handleCheckTodo={handleCheckTodo}
        startEditTask={startEditTodo}
      ></TaskList>
      <TaskList
        todos={doneTodos}
        doneTaskList={true}
        handleCheckTodo={handleCheckTodo}
        startEditTask={startEditTodo}
      ></TaskList>
    </div>
  );
}

export default ToDoList;
