/**
 * 챌린지 3 of 4: 조정할 수 없는 딜레이 고치기
 * 이 예제에서는 지연 시간인 interval을 사용자화할 수 있습니다.
 * interval은 state 변수 delay에 저장되어 있고 두 개의 버튼으로 업데이트됩니다.
 * 그러나 delay가 1000밀리초(즉 1초)가 될 때까지 “+100 ms” 버튼을 눌러도 타이머가 여전히 매우 빠르게(100밀리초마다) 증가하는 것을 알 수 있습니다.
 * 마치 delay의 변화가 무시되는 것 같습니다. 버그를 찾아 고치세요.
 */
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';

export default function Timer() {
    const [count, setCount] = useState(0);
    const [increment, setIncrement] = useState(1);
    const [delay, setDelay] = useState(100);

    const onTick = useEffectEvent(() => {
        setCount(c => c + increment);
    });

    // const onMount = useEffectEvent(() => {
    //     return setInterval(() => {
    //         onTick();
    //     }, delay);
    // });

    // Effect Event는 코드 일부를 비반응형으로 만들고 싶다는 특정한 이유가 있을 때만 추출해야 한다.
    // setInterval 호출은 state 변수 delay에 반응해야 한다.
    // delay가 변경되면 interval이 다시 설정되어야 한다.
    useEffect(() => {
        const id = setInterval(()=>{
            onTick();
        }, delay);
        return () => {
            clearInterval(id);
        }
    }, [delay]);

    return (
        <>
            <h1>
                카운터: {count}
                <button onClick={() => setCount(0)}>재설정</button>
            </h1>
            <hr />
            <p>
                증가량:
                <button disabled={increment === 0} onClick={() => {
                    setIncrement(i => i - 1);
                }}>–</button>
                <b>{increment}</b>
                <button onClick={() => {
                    setIncrement(i => i + 1);
                }}>+</button>
            </p>
            <p>
                증가 지연 시간:
                <button disabled={delay === 100} onClick={() => {
                    setDelay(d => d - 100);
                }}>–100 ms</button>
                <b>{delay} ms</b>
                <button onClick={() => {
                    setDelay(d => d + 100);
                }}>+100 ms</button>
            </p>
        </>
    );
}
