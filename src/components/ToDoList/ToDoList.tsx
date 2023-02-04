import React, { useEffect, useState } from "react";
import { Todo } from "../../@types/Todo.type";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";

function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
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

  useEffect(() => {
    console.log(todos);
  }, [todos]);
  return (
    <div className={styles.todoList}>
      <TaskInput addTodo={addTodo}></TaskInput>
      <TaskList
        todos={onGoingTodos}
        doneTaskList={false}
        handleCheckTodo={handleCheckTodo}
      ></TaskList>
      <TaskList
        todos={doneTodos}
        doneTaskList={true}
        handleCheckTodo={handleCheckTodo}
      ></TaskList>
    </div>
  );
}

export default ToDoList;
