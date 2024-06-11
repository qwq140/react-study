/**
 * 챌린지 1 of 5: 입력 문자열이 사라지는 것 고치기
 * 이 예시에서 버튼을 누르면 메시지를 보여줍니다.
 * 하지만 버튼을 누르는 것은 또한 원치 않게 state를 초기화합니다.
 * 왜 이런 현상이 일어날까요? 버튼을 눌러도 입력 문자열이 초기화되지 않도록 고쳐보세요.
 */
import { useState } from 'react';

export default function App() {
    const [showHint, setShowHint] = useState(false);
    if (showHint) {
        return (
            <div>
                <p><i>Hint: Your favorite city?</i></p>
                <Form />
                <button onClick={() => {
                    setShowHint(false);
                }}>Hide hint</button>
            </div>
        );
    }
    return (
        <div>
            <Form />
            <button onClick={() => {
                setShowHint(true);
            }}>Show hint</button>
        </div>
    );
}

function Form() {
    const [text, setText] = useState('');
    return (
        <textarea
            value={text}
            onChange={e => setText(e.target.value)}
        />
    );
}
