/**
 * 챌린지 1 of 2: 요청 카운터를 고쳐보세요.
 * 사용자가 동시에 여러 개의 미술품을 주문할 수 있는 예술 쇼핑몰 앱에서 작업하고 있습니다.
 * 사용자가 “Buy” 버튼을 누를 때마다 “Pending” 카운터가 1씩 증가해야 합니다.
 * 3초 후에는 “Pending” 카운터가 감소하고 “Completed” 카운터가 증가해야 합니다.
 *
 * 그런데 “Pending” 카운터가 의도대로 작동하지 않고 있습니다.
 * “Buy”를 누르면  -1로 감소합니다(그럴 수 없습니다!).
 * 그리고 빠르게 두 번 클릭하면 두 카운터가 모두 예측할 수 없게 작동하는 것 같습니다.
 *
 * 왜 이런 일이 발생할까요? 두 카운터를 모두 수정하세요.
 *
 * 이벤트 핸들러 내부에서 pending과 completed 값은 클릭 이벤트 당시의 값과 일치한다.
 * 그래서 delay 이후 실행되는 setter는 setPending(0-1), setCompleted(0+1)이 실행되어 pending의 값이 -1로 감소된다.
 */
import { useState } from 'react';

export default function RequestTracker() {
    const [pending, setPending] = useState(0);
    const [completed, setCompleted] = useState(0);

    async function handleClick() {
        setPending(pending + 1);
        await delay(3000);
        setPending(p=>p - 1);
        setCompleted(c => c + 1);
    }

    return (
        <>
            <h3>
                Pending: {pending}
            </h3>
            <h3>
                Completed: {completed}
            </h3>
            <button onClick={handleClick}>
                Buy
            </button>
        </>
    );
}

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
