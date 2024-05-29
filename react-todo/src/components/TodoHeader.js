export function TodoHeader({todos}) {

    const count = todos.filter((e) => e.isDone).length;

    return (
        <div className={"header"}>
            <h1>2024년 05월 29일</h1>
            <div>할 일 : {count}개</div>
        </div>
    );
}