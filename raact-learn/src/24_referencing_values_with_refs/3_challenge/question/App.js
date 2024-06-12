/**
 * 챌린지 3 of 4: debouncing 수정
 * 예시에서 모든 버튼 클릭 핸들러는 “debounced”입니다.
 * 어떤 의미인지 보려면 버튼 중 하나를 누르세요.
 * 1초 후에 메시지가 어떻게 표시되는지 확인해볼게요.
 * 메시지 대기 중에 버튼을 누르면 타이머가 리셋됩니다.
 * 따라서 같은 버튼을 여러 번 빠르게 클릭하면 다음 클릭이 멈출 때까지 메시지가 나타나지 않습니다.
 * debouncing을 사용하면 사용자가 “작업이 중지될” 때까지 일부 작업을 지연시킬 수 있습니다.
 *
 * 예시는 작동하지만, 의도한 대로 작동하지 않습니다. 버튼은 독립적이지 않습니다.
 * 문제를 보려면 버튼 중 하나를 클릭한 다음 즉시 다른 버튼을 클릭합니다.
 * 지연된 후에 양쪽 버튼의 메시지를 볼 수 있을 것이라고 예상할 것입니다.
 * 그러나 마지막 버튼의 메시지만 표시됩니다. 첫 번째 버튼의 메시지가 사라집니다.
 *
 * 왜 두 버튼이 서로 간섭하는 것일까요? 문제를 찾아 해결해 봅시
 */
import { useState } from 'react';

let timeoutID;

function DebouncedButton({ onClick, children }) {
    return (
        <button onClick={() => {
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                onClick();
            }, 1000);
        }}>
            {children}
        </button>
    );
}

export default function Dashboard() {
    return (
        <>
            <DebouncedButton
                onClick={() => alert('Spaceship launched!')}
            >
                Launch the spaceship
            </DebouncedButton>
            <DebouncedButton
                onClick={() => alert('Soup boiled!')}
            >
                Boil the soup
            </DebouncedButton>
            <DebouncedButton
                onClick={() => alert('Lullaby sung!')}
            >
                Sing a lullaby
            </DebouncedButton>
        </>
    )
}
