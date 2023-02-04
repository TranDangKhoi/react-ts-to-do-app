import React, { useEffect, useState } from "react";
import { Todo } from "../../@types/Todo.type";
import TaskInput from "../TaskInput";
import TaskList from "../TaskList";
import styles from "./todoList.module.scss";

interface HandleNewTodos {
  (todos: Todo[]): Todo[];
}

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
  const lcTodoList = localStorage.getItem("todos");
  const todoObj: Todo[] = JSON.parse(lcTodoList || "[]");
  const newTodoObj = handleNewTodos(todoObj);
  localStorage.setItem("todos", JSON.stringify(newTodoObj));
};

function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTask, setCurrentTask] = useState<Todo | null>(null);
  const doneTodos = todos.filter((todo) => todo.done);
  const onGoingTodos = todos.filter((todo) => !todo.done);

  useEffect(() => {
    const lcTodoList = localStorage.getItem("todos");
    const todoObj: Todo[] = JSON.parse(lcTodoList || "[]");
    setTodos(todoObj);
  }, []);

  const addTodo = (name: string) => {
    const handler = (todoObj: Todo[]) => {
      return [...todoObj, todo];
    };
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    };
    setTodos((prevState: Todo[]) => [...prevState, todo]);
    syncReactToLocal(handler);
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
    const handler = (todoObj: Todo[]) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTask?.id) {
          return currentTask;
        }
        localStorage.setItem("todos", JSON.stringify(todo));

        return todo;
      });
    };
    setTodos(handler);
    setCurrentTask(null);
    syncReactToLocal(handler);
  };

  const handleDeleteTodo = (id: string) => {
    // Cách 1:
    if (currentTask) {
      setCurrentTask(null);
    }
    const newToDos = todos.filter((todo) => todo.id !== id);
    if (newToDos) {
      setTodos(newToDos);
      localStorage.setItem("todos", JSON.stringify(newToDos));
    }
    // Cách 2:
    // if (currentTask) {
    //   setCurrentTask(null);
    // }
    // setTodos((prev) => {
    //   const foundIndexTodo = prev.findIndex((todo) => todo.id === id);
    //   if (foundIndexTodo > -1) {
    //     const clonedResults = [...prev];
    //     clonedResults.splice(foundIndexTodo, 1);
    //     const lcTodoList = localStorage.getItem("todos");
    //     const todoObj: Todo[] = JSON.parse(lcTodoList || "[]");
    //     localStorage.setItem("todos", JSON.stringify(todoObj.splice(foundIndexTodo, 1)));
    //     return clonedResults;
    //   }
    //   return prev;
    // });
  };

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
        handleDeleteTodo={handleDeleteTodo}
      ></TaskList>
      <TaskList
        todos={doneTodos}
        doneTaskList={true}
        handleCheckTodo={handleCheckTodo}
        startEditTask={startEditTodo}
        handleDeleteTodo={handleDeleteTodo}
      ></TaskList>
    </div>
  );
}

export default ToDoList;
