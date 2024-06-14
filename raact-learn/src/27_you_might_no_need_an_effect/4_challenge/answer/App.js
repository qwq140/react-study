/**
 * 챌린지 4 of 4: Effect 없이 폼 제출하기
 * 이 Form 컴포넌트를 사용하면 친구에게 메시지를 보낼 수 있습니다.
 * 폼을 제출하면 showForm state 변수가 false로 설정됩니다.
 * 그러면 sendMessage(message)를 호출하는 Effect가 트리거되어 메시지가 전송됩니다(콘솔에서 확인할 수 있음).
 * 메시지가 전송되면 “Open chat” 버튼이 있는 “Thank you” 대화 상자가 표시되어 폼으로 돌아갈 수 있습니다.
 *
 * 앱 사용자가 너무 많은 메시지를 보내고 있습니다.
 * 채팅을 조금 더 어렵게 만들기 위해 양식 대신 “Thank you” 대화 상자를 먼저 표시하기로 결정했습니다.
 * showForm state 변수를 true가 아닌 false로 초기화하도록 변경합니다.
 * 이렇게 변경하자마자 콘솔에 빈 메시지가 전송된 것으로 표시됩니다. 이 로직의 뭔가가 잘못되었습니다!
 *
 * 이 문제의 근본 원인은 무엇인가요? 그리고 어떻게 해결할 수 있을까요?
 *
 * showForm state 변수는 폼을 표시할 지 "Thank you"대화 상자를 표시할지를 결정한다.
 * "Thank you" 대화 상자가 표시되었기 때문에 메시지를 보내는 것이 아니다.
 * 메시지를 보내는 것은 사용자가 폼을 제출했기 떄문에 보내는 것이다.
 * 오해의 소지가 있는 Effect를 삭제하고 handleSubmit 이벤트 핸들러 내부로 sendMessage 호출을 이동한다.
 */
import { useState, useEffect } from 'react';

export default function Form() {
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        setShowForm(false);
        sendMessage(message);
    }

    if (!showForm) {
        return (
            <>
                <h1>Thanks for using our services!</h1>
                <button onClick={() => {
                    setMessage('');
                    setShowForm(true);
                }}>
                    Open chat
                </button>
            </>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          placeholder="Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
      />
            <button type="submit" disabled={message === ''}>
                Send
            </button>
        </form>
    );
}

function sendMessage(message) {
    console.log('Sending message: ' + message);
}
