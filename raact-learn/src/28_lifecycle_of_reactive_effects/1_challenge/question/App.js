/**
 * 챌린지 1 of 5: 모든 키 입력 시 재연결 문제 수정
 * 이 예제에서 ChatRoom 컴포넌트는 컴포넌트가 마운트될 때 채팅방에 연결되고,
 * 마운트가 해제되면 연결이 끊어지며,
 * 다른 채팅방을 선택하면 다시 연결됩니다.
 * 이 동작은 올바른 것이므로 계속 작동하도록 해야 합니다.
 *
 * 하지만 문제가 있습니다. 하단의 메시지 상자 입력란에 입력할 때마다 ChatRoom도 채팅에 다시 연결됩니다.
 * (콘솔을 지우고 입력란에 입력하면 이 문제를 확인할 수 있습니다) 이런 일이 발생하지 않도록 문제를 해결하세요.
 */
import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => connection.disconnect();
    });

    return (
        <>
            <h1>Welcome to the {roomId} room!</h1>
            <input
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
        </>
    );
}

export default function App() {
    const [roomId, setRoomId] = useState('general');
    return (
        <>
            <label>
                Choose the chat room:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <hr />
            <ChatRoom roomId={roomId} />
        </>
    );
}
