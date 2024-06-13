import { useRef } from 'react';

/**
 * 1. useRef Hook을 사용하여 inputRef를 선언
 * 2. inputRef를 <input>에 전달
 * 3. handleClick 함수에서 inputRef.current에서 input DOM 노드를 읽고 inputRef.current.focus()로 focus() 호출
 * 4. <button>의 onClick으로 handleClick 이벤트 핸들러 전달
 */
export default function Form() {
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.focus();
    }

    return (
        <>
            <input ref={inputRef} />
            <button onClick={handleClick}>
                Focus the input
            </button>
        </>
    );
}
