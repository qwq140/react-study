import {TodoItem} from "./TodoItem";

export function TodoList({todos, handleTodos}) {

    const items = todos.map((todo) => <TodoItem todo={todo} todos={todos} handleTodos={handleTodos}/>);

    return (
      <div className={"todo-list"}>
          {items}
      </div>
    );

}