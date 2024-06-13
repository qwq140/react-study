import { useState, useEffect } from 'react';

// React는 항상 이전 렌더의 Effect를 다음 렌더의 Effect보다 먼저 정리한다.
function Playground() {
    const [text, setText] = useState('a');

    // setTimeout을 이용하여 Effect가 실행된 후 3초 후에 입력 텍스트와 함께 콘솔 로그가 표시
    useEffect(() => {
        function onTimeout() {
            console.log('⏰ ' + text);
        }

        console.log('🔵 스케줄 로그 "' + text);
        const timeoutId = setTimeout(onTimeout, 3000);

        // 클린업 함수 : 실행을 기다리는 타임아웃 취소
        return () => {
            console.log('🟡 취소 로그 "' + text);
            clearTimeout(timeoutId);
        };
    }, [text]);

    return (
        <>
            <label>
                What to log:{' '}
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
            </label>
            <h1>{text}</h1>
        </>
    );
}

export default function App() {
    const [show, setShow] = useState(false);
    return (
        <>
            <button onClick={() => setShow(!show)}>
                컴포넌트 {show ? '언마운트' : '마운트'}
            </button>
            {show && <hr />}
            {show && <Playground />}
        </>
    );
}