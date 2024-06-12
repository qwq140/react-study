/**
 * 챌린지 1 of 4: 정상적으로 동작하지 않는 채팅 입력창 수정
 * 메시지를 입력하고 “Send”를 클릭합니다.
 * “Sent!” 경고창(alert)이 나타나기 전에 3초 정도 지연된다는 것을 알 수 있습니다.
 * 이 지연된 시간 동안 “Undo” 버튼을 볼 수 있습니다. 누르세요.
 * 이 “Undo” 버튼은 “Sent!” 메시지가 나타나지 않도록 합니다.
 * handleSend 중 저장된 timeout ID에 대해 clearTimeout을 호출하면 됩니다.
 * 그러나 “Undo”를 클릭한 후에도 “Sent!” 메시지가 계속 나타납니다. 왜 작동이 되지 않는지 찾아서 고쳐봅시다.
 */
import { useState } from 'react';

export default function Chat() {
    const [text, setText] = useState('');
    const [isSending, setIsSending] = useState(false);
    let timeoutID = null;

    function handleSend() {
        setIsSending(true);
        timeoutID = setTimeout(() => {
            alert('Sent!');
            setIsSending(false);
        }, 3000);
    }

    function handleUndo() {
        setIsSending(false);
        clearTimeout(timeoutID);
    }

    return (
        <>
            <input
                disabled={isSending}
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button
                disabled={isSending}
                onClick={handleSend}>
                {isSending ? 'Sending...' : 'Send'}
            </button>
            {isSending &&
                <button onClick={handleUndo}>
                    Undo
                </button>
            }
        </>
    );
}
