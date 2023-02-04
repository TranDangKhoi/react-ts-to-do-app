import React, { useState } from "react";
import styles from "./taskInput.module.scss";

interface TaskInputProps {
  addTodo: (name: string) => void;
}

function TaskInput(props: TaskInputProps) {
  const { addTodo } = props;
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(name);
    setName("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
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
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default TaskInput;
