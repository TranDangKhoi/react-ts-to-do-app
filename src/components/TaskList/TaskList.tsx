import React from "react";
import { Todo } from "../../@types/Todo.type";
import styles from "./taskList.module.scss";

interface TaskListProps {
  doneTaskList?: boolean;
  todos: Todo[];
  handleCheckTodo: (id: string, done: boolean) => void;
  startEditTask: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleCheckTodo, startEditTask, handleDeleteTodo } = props;
  const onChangeCheckbox = (idTodo: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckTodo(idTodo, e.target.checked);
  };

  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? "Hoàn thành" : "Chưa hoàn thành"}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={styles.task}
          >
            <>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={todo.done}
                onChange={onChangeCheckbox(todo.id)}
              />
              <span className={`${styles.taskName} ${todo.done ? styles.done : ""}`}>{todo.name}</span>
              <div className={styles.taskAction}>
                <button
                  className={styles.taskBtn}
                  onClick={() => startEditTask(todo.id)}
                >
                  🖊
                </button>
                <button
                  className={styles.taskBtn}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  🗑
                </button>
              </div>
            </>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
