/**
 * 챌린지 4 of 4: 지연된 알림 고치기
 * 이 컴포넌트는 채팅방에 참여하면 알림을 보여줍니다.
 * 하지만 알림을 바로 보여주지는 않습니다. 대신 의도적으로 2초 정도 지연시켜서 사용자가 UI를 둘러볼 수 있도록 합니다.
 *
 * 대부분 동작하지만, 버그가 있습니다.
 * 드롭다운을 “general”에서 “travel”로 변경한 다음 “music”으로 아주 빠르게 변경해 보세요.
 * 2초 안에 변경하면 (기대한 대로!) 두 개의 알림이 보이지만 둘 다 “music에 오신 것을 환영합니다”라고 합니다.
 *
 * ”general”에서 “travel”로 전환한 다음 “music”으로 매우 빠르게 전환할 때 첫 번째 알림은 “travel에 오신 것을 환영합니다”이고
 * 두 번째 알림은 “music에 오신 것을 환영합니다”가 되도록 고쳐보세요.
 * (추가 도전으로 이미 알림이 올바른 방을 보여주도록 만들었다면 나중의 알림만 보여주도록 코드를 바꿔보세요.)
 */
import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { createConnection, sendMessage } from './chat.js';
import { showNotification } from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId, theme }) {
    const onConnected = useEffectEvent(() => {
        showNotification(roomId + '에 오신 것을 환영합니다', theme);
    });

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.on('connected', () => {
            setTimeout(() => {
                onConnected();
            }, 2000);
        });
        connection.connect();
        return () => connection.disconnect();
    }, [roomId]);

    return <h1>{roomId} 방에 오신 것을 환영합니다!</h1>
}

export default function App() {
    const [roomId, setRoomId] = useState('general');
    const [isDark, setIsDark] = useState(false);
    return (
        <>
            <label>
                채팅방 선택:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="travel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={isDark}
                    onChange={e => setIsDark(e.target.checked)}
                />
                어두운 테마 사용
            </label>
            <hr />
            <ChatRoom
                roomId={roomId}
                theme={isDark ? 'dark' : 'light'}
            />
        </>
    );
}
