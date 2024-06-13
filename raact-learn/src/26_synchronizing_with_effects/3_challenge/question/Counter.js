/**
 * 챌린지 3 of 4: 두 번 실행되는 interval 고치기
 * 아래 ‘Counter’ 컴포넌트는 매 초마다 증가하는 카운터를 나타냅니다.
 * 컴포넌트가 마운트될 때 setInterval을 호출합니다.
 * 이로 인해 ‘onTick’ 함수가 매 초마다 실행됩니다.
 * ‘onTick’ 함수는 카운터를 증가시킵니다.
 *
 * 하지만 1초마다 한 번씩 증가하는 대신 두 번씩 증가합니다. 왜 그럴까요? 버그의 원인을 찾아 수정하세요
 */
import { useState, useEffect } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        function onTick() {
            setCount(c => c + 1);
        }

        setInterval(onTick, 1000);
    }, []);

    return <h1>{count}</h1>;
}
