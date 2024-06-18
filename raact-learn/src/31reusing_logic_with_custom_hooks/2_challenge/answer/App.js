/**
 * 챌린지 2 of 5: 카운터의 지연을 수정 가능하게 하기
 * 이 예시에는 슬라이더를 통해 조작되는 delay라는 state 변수가 있지만 사용되고 있지 않습니다.
 * useCounter 커스텀 Hook에 delay 값을 전달해, 하드 코딩된 1000 ms이 아닌 전달된 delay 값을 사용하도록 해봅시다.
 */
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
    const [delay, setDelay] = useState(1000);
    const count = useCounter(delay);
    return (
        <>
            <label>
                Tick duration: {delay} ms
                <br />
                <input
                    type="range"
                    value={delay}
                    min="10"
                    max="2000"
                    onChange={e => setDelay(Number(e.target.value))}
                />
            </label>
            <hr />
            <h1>Ticks: {count}</h1>
        </>
    );
}
