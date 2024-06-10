/**
 * 챌린지 1 of 4: 업데이트되지 않는 컴포넌트 수정하기
 * 이 Clock 컴포넌트는 color와 time 두 가지 props를 받습니다.
 * 선택 창에서 다른 색상을 선택하면 Clock 컴포넌트는 부모 컴포넌트에서 다른 color prop을 받습니다.
 * 그러나 어떤 이유에서인지 표시된 색상이 업데이트되지 않습니다. 왜 그럴까요? 문제를 해결하세요.
 *
 * color prop으로 초기화한 color state를 갖느다.
 * color prop이 변경되면 이는 state 변수에 영향을 주지 않는다. 그래서 서로 동기화되지 않는다.
 * state 변수를 제거하고 color prop을 직접 사용하여 문제를 해결할 수 있다.
 */
import { useState } from 'react';

export default function Clock(props) {
    return (
        <h1 style={{ color: props.color }}>
            {props.time}
        </h1>
    );
}
