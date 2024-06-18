/**
 * 챌린지 1 of 5: useCounter Hook 추출하기
 * 이 컴포넌트는 매초 증가하는 숫자를 보여주기 위해 state 변수와 Effect를 사용합니다.
 * useCounter라는 커스텀 Hook으로 이 로직을 분리해 봅시다.
 * 우리의 목표는 정확히 다음과 같이 동작하는 Counter를 만드는 것입니다.
 */
import { useState, useEffect } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return <h1>Seconds passed: {count}</h1>;
}
