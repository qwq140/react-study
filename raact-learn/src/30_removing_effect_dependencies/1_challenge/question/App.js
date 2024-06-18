/**
 * 챌린지 1 of 4: 인터벌 초기화 수정하기
 * 이 Effect는 매초마다 증가되는 인터벌을 설정합니다.
 * 이상한 일이 발생하는 것을 발견했습니다.
 * 인터벌이 증가될 때마다 인터벌이 파괴되고 다시 생성되는 것 같습니다.
 * 인터벌이 계속 다시 생성되지 않도록 코드를 수정하세요.
 */
import { useState, useEffect } from 'react';

export default function Timer() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('✅ Creating an interval');
        const id = setInterval(() => {
            console.log('⏰ Interval tick');
            setCount(count + 1);
        }, 1000);
        return () => {
            console.log('❌ Clearing an interval');
            clearInterval(id);
        };
    }, [count]);

    return <h1>Counter: {count}</h1>
}
