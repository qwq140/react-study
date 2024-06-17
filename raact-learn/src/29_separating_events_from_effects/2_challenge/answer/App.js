/**
 * 챌린지 2 of 4: 멈추는 카운터 고치기
 * 아래의 Timer 컴포넌트에는 매초 증가하는 state 변수 count가 있습니다.
 * 증가량은 state 변수 increment에 저장되며 더하기와 빼기 버튼으로 제어할 수 있습니다.
 * 예를 들어 더하기 버튼을 9번 누르면 count가 이제 매초 1이 아닌 10씩 증가하는 것을 확인할 수 있습니다.
 *
 * 이 사용자 인터페이스에는 작은 문제가 있습니다.
 * 더하기 또는 빼기 버튼을 초당 한 번보다 빠르게 계속 누르면 타이머 자체가 잠시 멈춘 것처럼 보입니다.
 * 타이머는 마지막으로 버튼을 누른 후 1초가 지나야 다시 시작됩니다.
 * 타이머가 중단되지 않고 매초 tick 하도록 이 현상의 원인을 찾고 문제를 해결하세요.
 */
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
    const [count, setCount] = useState(0);
    const [increment, setIncrement] = useState(1);

    // 기존에 effect가 increment에 의존한다.
    // increment가 변경될 때마다 Effect가 다시 동기화되고 그로 인해 interval이 clear된다.
    // 타이머가 시작하려고 할 때마다 interval을 clear하면 타이머가 멈춘 것처럼 보인다.
    // 이러한 현상을 해결하기 위해
    // Effect Event를 onTick으로 추출한다.
    // 이렇게 되면 onTick은 Effect Event이므로 내부의 코드는 반응형이 아니다.
    // increment가 변해도 effect를 트리거 하지 않는다.
    const onTick = useEffectEvent(()=> {
        setCount(c => c + increment);
    })

    useEffect(() => {
        const id = setInterval(() => {
            onTick();
        }, 1000);
        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <>
            <h1>
                카운터: {count}
                <button onClick={() => setCount(0)}>재설정</button>
            </h1>
            <hr />
            <p>
                초당 증가량:
                <button disabled={increment === 0} onClick={() => {
                    setIncrement(i => i - 1);
                }}>–</button>
                <b>{increment}</b>
                <button onClick={() => {
                    setIncrement(i => i + 1);
                }}>+</button>
            </p>
        </>
    );
}
