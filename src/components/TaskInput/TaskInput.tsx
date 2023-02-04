import React, { useState } from "react";
import { Todo } from "../../@types/Todo.type";
import styles from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
  currentTask: Todo | null;
  editTask: (name: string) => void;
  finishEditTodo: () => void;
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTask, editTask, finishEditTodo } = props;
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTask) {
      finishEditTodo();
    } else {
      addTodo(name);
    }
    setName("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (currentTask) {
      editTask(value);
    } else {
      setName(value);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To Do List</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your task goes here"
          onChange={handleInputChange}
          value={currentTask ? currentTask.name : name}
        />
        <button type="submit">{currentTask ? "✅" : "📃"}</button>
      </form>
    </div>
  );
}

export default TaskInput;
