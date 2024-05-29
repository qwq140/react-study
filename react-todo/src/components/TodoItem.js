export function TodoItem({todos, todo, handleTodos}) {

    function handleCheck() {
        const newTodos = todos.map((e) => e.id === todo.id ? {...e, isDone : !e.isDone} : e);
        handleTodos(newTodos);
    }


    function handleRemove() {
        const newTodos = todos.filter((e) => e.id !== todo.id);
        handleTodos(newTodos);
    }


    return (
        <div className={`todo-item`} key={todo.id}>
            <input type={"checkbox"} checked={todo.isDone} onChange={handleCheck}/>
            <div className={`todo-item-text ${todo.isDone && "todo-done"}`}>{todo.text}</div>
            <div onClick={handleRemove}>삭제</div>
        </div>
    );
}