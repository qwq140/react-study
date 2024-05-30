import {useTodoDispatch} from "../contexts/TodoContext";

export function TodoItem({id, text, isDone}) {

    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({type : 'TOGGLE', id});
    const onRemove = () => dispatch({type : 'REMOVE', id});


    return (
        <div className={`todo-item`} key={id}>
            <input type={"checkbox"} checked={isDone} onChange={onToggle}/>
            <div className={`todo-item-text ${isDone && "todo-done"}`}>{text}</div>
            <div onClick={onRemove}>삭제</div>
        </div>
    );
}