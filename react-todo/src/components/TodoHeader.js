import {useTodoState} from "../contexts/TodoContext";

export function TodoHeader() {

    const todos = useTodoState();
    const undoneTodos = todos.filter(todo => !todo.isDone);

    const today = new Date();


    return (
        <div className={"header"}>
            <h1>{today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일</h1>
            <div>할 일 : {undoneTodos.length}개</div>
        </div>
    );
}