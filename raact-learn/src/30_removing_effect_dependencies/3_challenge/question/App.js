/**
 * 챌린지 3 of 4: 채팅 재연결 문제 해결하기
 * 이 예시에서는 ‘Toggle theme’을 누를 때마다 채팅이 다시 연결됩니다.
 * 왜 이런 일이 발생하나요? 서버 URL을 편집하거나 다른 채팅방을 선택할 때만 채팅이 다시 연결되도록 실수를 수정하세요.
 *
 * chat.js를 외부 서드파티 라이브러리로 취급하여 API를 확인하기 위해 참조할 수는 있지만 편집해서는 안됩니다.
 */
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [roomId, setRoomId] = useState('general');
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    const options = {
        serverUrl: serverUrl,
        roomId: roomId
    };

    return (
        <div className={isDark ? 'dark' : 'light'}>
            <button onClick={() => setIsDark(!isDark)}>
                Toggle theme
            </button>
            <label>
                Server URL:{' '}
                <input
                    value={serverUrl}
                    onChange={e => setServerUrl(e.target.value)}
                />
            </label>
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
            <ChatRoom options={options} />
        </div>
    );
}
