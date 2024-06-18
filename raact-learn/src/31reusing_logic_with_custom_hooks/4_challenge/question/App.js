/**
 * 챌린지 4 of 5: 간격 재설정 고치기
 * 이 예시에서 두 개의 별개의 간격이 존재합니다.
 *
 * useCounter를 호출하는 App 컴포넌트는 카운터를 매초 업데이트하기 위해 useInterval를 호출합니다.
 * 그러나 App 는 useInterval를 2초에 한 번씩 랜덤하게 배경색을 변경하기 위해 useInterval를 또 호출합니다.
 *
 * 이런 이유로 배경을 업데이트하는 콜백은 절대 실행되지 않습니다. useInterval 내부에 로그를 남겨보세요.
 *   useEffect(() => {
 *     console.log('✅ Setting up an interval with delay ', delay)
 *     const id = setInterval(onTick, delay);
 *     return () => {
 *       console.log('❌ Clearing an interval with delay ', delay)
 *       clearInterval(id);
 *     };
 *   }, [onTick, delay]);
 *
 * 로그가 생각했던 대로 잘 동작하나요?
 * 어떤 Effect가 불필요하게 재동기화한다면, 어떤 의존성이 원인이 되었는지 예측할 수 있나요?
 * 해당 Effect에서 그 의존성을 제거하는 방법이 있나요?
 *
 * 이 문제를 해결한 뒤, 배경 화면이 2초마다 바뀔 수 있다고 예상합니다.
 */
import { useCounter } from './useCounter.js';
import { useInterval } from './useInterval.js';

export default function Counter() {
    const count = useCounter(1000);

    useInterval(() => {
        const randomColor = `hsla(${Math.random() * 360}, 100%, 50%, 0.2)`;
        document.body.style.backgroundColor = randomColor;
    }, 2000);

    return <h1>Seconds passed: {count}</h1>;
}
