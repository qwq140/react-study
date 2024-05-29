import {TodoHeader} from "./TodoHeader";
import {TodoInput} from "./TodoInput";
import {TodoList} from "./TodoList";
import {useState} from "react";

export function TodoBody() {
    const [todos, setTodos] = useState([]);

    return (
        <div className={"todo-body"}>
            <TodoHeader todos={todos}/>
            <TodoInput todos={todos} handleTodos={setTodos}/>
            <TodoList todos={todos} handleTodos={setTodos}/>
        </div>
    );
}