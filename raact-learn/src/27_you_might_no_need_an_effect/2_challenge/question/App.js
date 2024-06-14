/**
 * 챌린지 2 of 4: Effect 없이 계산 캐시하기
 * 이 예제에서는 todos 필터링이 getVisibleTodos()라는 별도의 함수로 추출되었습니다.
 * 이 함수 안에는 언제 호출되는지 알 수 있도록 console.log() 호출이 포함되어 있습니다.
 * “Show only active todos”를 토글하면 getVisibleTodos()가 다시 실행되는 것을 확인할 수 있습니다.
 * 이는 표시할 todos를 토글하면 표시되는 todos가 변경되기 때문에 예상되는 현상입니다.
 *
 * 여러분이 해야 할 일은 TodoList 컴포넌트에서 visibleTodos 목록을 다시 계산하는 Effect를 제거하는 것입니다.
 * 그러나 input에 입력할 때 getVisibleTodos()가 다시 실행되지 않도록(따라서 로그를 출력하지 않도록) 해야 합니다.
 */
import { useState, useEffect } from 'react';
import { initialTodos, createTodo, getVisibleTodos } from './todos.js';

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos);
    const [showActive, setShowActive] = useState(false);
    const [text, setText] = useState('');
    const [visibleTodos, setVisibleTodos] = useState([]);

    useEffect(() => {
        setVisibleTodos(getVisibleTodos(todos, showActive));
    }, [todos, showActive]);

    function handleAddClick() {
        setText('');
        setTodos([...todos, createTodo(text)]);
    }

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
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={handleAddClick}>
                Add
            </button>
            <ul>
                {visibleTodos.map(todo => (
                    <li key={todo.id}>
                        {todo.completed ? <s>{todo.text}</s> : todo.text}
                    </li>
                ))}
            </ul>
        </>
    );
}

