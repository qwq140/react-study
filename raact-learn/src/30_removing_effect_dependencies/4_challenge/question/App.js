/**
 * 챌린지 4 of 4: 다시, 채팅 재연결 문제 수정하기
 * 이 예시는 암호화 여부와 상관없이 채팅에 연결됩니다.
 * 체크박스를 토글하면 암호화가 켜져 있을 때와 꺼져 있을 때 콘솔에 표시되는 메시지가 달라지는 것을 확인할 수 있습니다.
 * 채팅방을 변경해 보세요. 그런 다음 테마를 토글해 보세요. 채팅방에 연결되면 몇 초마다 새 메시지를 받게 됩니다.
 * 메시지의 색상이 선택한 테마와 일치하는지 확인하세요.
 *
 * 이 예시에서는 테마를 변경하려고 할 때마다 채팅이 다시 연결됩니다. 이 문제를 수정하세요.
 * 수정 후 테마를 변경해도 채팅이 다시 연결되지 않지만, 암호화 설정을 토글하거나 채팅방을 변경하면 다시 연결됩니다.
 *
 * chat.js의 코드를 변경하지 마세요. 그 외에는 동일한 동작을 초래하는 한 어떤 코드든 변경할 수 있습니다.
 * 예를 들어 어떤 props가 전달되는지를 확인하고 변경하는 것이 도움이 될 수 있습니다.
 */
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
    createEncryptedConnection,
    createUnencryptedConnection,
} from './chat.js';
import { showNotification } from './notifications.js';

export default function App() {
    const [isDark, setIsDark] = useState(false);
    const [roomId, setRoomId] = useState('general');
    const [isEncrypted, setIsEncrypted] = useState(false);

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={e => setIsDark(e.target.checked)}
                />
                Use dark theme
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isEncrypted}
                    onChange={e => setIsEncrypted(e.target.checked)}
                />
                Enable encryption
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
            <ChatRoom
                roomId={roomId}
                onMessage={msg => {
                    showNotification('New message: ' + msg, isDark ? 'dark' : 'light');
                }}
                createConnection={() => {
                    const options = {
                        serverUrl: 'https://localhost:1234',
                        roomId: roomId
                    };
                    if (isEncrypted) {
                        return createEncryptedConnection(options);
                    } else {
                        return createUnencryptedConnection(options);
                    }
                }}
            />
        </>
    );
}
