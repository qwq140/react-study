export function TodoHeader({todos}) {

    const count = todos.filter((e) => !e.isDone).length;

    const today = new Date();


    return (
        <div className={"header"}>
            <h1>{today.getFullYear()}년 {today.getMonth()+1}월 {today.getDate()}일</h1>
            <div>할 일 : {count}개</div>
        </div>
    );
}