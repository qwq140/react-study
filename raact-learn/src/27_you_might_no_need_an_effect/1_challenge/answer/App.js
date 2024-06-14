/**
 * 챌린지 1 of 4: Effect 없이 데이터 변환하기
 * 아래의 todos 목록에 TodoList가 표시됩니다.
 * “Show only active todos” 체크박스를 선택하면 완료된 todos는 목록에 표시되지 않습니다.
 * 표시되는 todos와 관계없이 footer에는 아직 완료되지 않은 todos의 수가 표시됩니다.
 *
 * 불필요한 state와 Effect를 모두 제거하여 이 컴포넌트를 단순화하세요.
 *
 * activeTodos와 visibleTodos는 todos, showActive state로 계산이 가능하다.
 */
import { useState, useEffect } from 'react';
import { initialTodos, createTodo } from './todos.js';

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [showActive, setShowActive] = useState(false);

    const activeTodos = todos.filter(todo => !todo.completed);
    const visibleTodos = showActive ? activeTodos : todos;

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showActive}
                    onChange={e => setShowActive(e.target.checked)}
                />
                Show only active todos
            </label>
            <NewTodo onAdd={newTodo => setTodos([...todos, newTodo])}/>
            <ul>
                {visibleTodos.map(todo => (
                    <li key={todo.id}>
                        {todo.completed ? <s>{todo.text}</s> : todo.text}
                    </li>
                ))}
            </ul>
            <footer>
                {activeTodos.length} todos left
            </footer>
        </>
    );
}

function NewTodo({onAdd}) {
    const [text, setText] = useState('');

    function handleAddClick() {
        setText('');
        onAdd(createTodo(text));
    }

    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick}>
                Add
            </button>
        </>
    );
}
