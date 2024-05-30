import {TodoItem} from "./TodoItem";
import {useTodoState} from "../contexts/TodoContext";

export function TodoList() {

    const todos = useTodoState();

    const items = todos.map((todo) => <TodoItem key={todo.id} id={todo.id} text={todo.text} isDone={todo.isDone} />);

    return (
      <div className={"todo-list"}>
          {items}
      </div>
    );

}