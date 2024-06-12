/**
 * 챌린지 4 of 4: 최신 state 읽기
 * 이 예시에서는 “보내기”를 누른 후 메시지가 표시되기 전에 약간의 지연이 발생합니다.
 * “hello”를 입력하고 보내기를 누른 다음 입력을 빠르게 다시 편집합니다.
 * 편집한 내용에도 불구하고 경고창(alert)에는 여전히 “hello”(그 당시 state 값 버튼이 클릭 됨)가 표시됩니다.
 *
 * 보통 이런 행동은 앱에서 원하는 것입니다.
 * 그러나 일부 비동기 코드가 일부 state의 최신 버전을 읽기를 원하는 경우가 있습니다.
 * 클릭 당시가 아니라 현제 입력 텍스트를 경고창(alert)에 표시하도록 할 수 있는 방법이 있을까요?
 */
import { useState, useRef } from 'react';

export default function Chat() {
    const [text, setText] = useState('');

    function handleSend() {
        setTimeout(() => {
            alert('Sending: ' + text);
        }, 3000);
    }

    return (
        <>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button
                onClick={handleSend}>
                Send
            </button>
        </>
    );
}
