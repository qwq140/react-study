/**
 * 챌린지 4 of 4: 불필요한 state 제거하기
 * 이 예제에서 버튼이 클릭 되면 사용자의 이름을 요청하고 그런 다음 환영 메시지를 표시해야 합니다.
 * 이름을 유지하기 위해 state를 사용하려고 했지만, 어떤 이유로 항상 “Hello, !”라고 표시됩니다.
 *
 * 이 코드를 수정하려면 불필요한 state 변수를 제거하세요. (왜 이것이 작동하지 않는지에 대해서는 나중에 설명하겠습니다.)
 *
 * 이 state 변수가 불필요한 이유를 설명할 수 있을까요?
 */
import { useState } from 'react';

export default function FeedbackForm() {

    function handleClick() {
        let name = prompt('What is your name?');
        alert(`Hello, ${name}!`);
    }

    return (
        <button onClick={handleClick}>
            Greet
        </button>
    );
}
