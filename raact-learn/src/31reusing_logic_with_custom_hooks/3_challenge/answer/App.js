/**
 * 챌린지 3 of 5: useCounter에서 useInterval 분리하기
 * 이제 useCounter는 두 가지 일을 합니다.
 * 간격을 설정하고, 간격마다 state 변수를 증가시킵니다.
 * 간격을 설정하는 로직을 useInterval라는 이름의 다른 Hook으로 분리해 봅시다.
 * 이 Hook은 onTick 콜백과 delay, 두 가지 props가 필요합니다.
 * 이렇게 변경하면 useCounter은 다음과 같이 보일 것입니다.
 */
import { useState } from 'react';
import { useCounter } from './useCounter.js';

export default function Counter() {
    const count = useCounter(1000);
    return <h1>Seconds passed: {count}</h1>;
}
