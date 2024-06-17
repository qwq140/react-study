/**
 * 챌린지 4 of 5: 연결 스위치 수정
 * 이 예제에서 chat.js의 채팅 서비스는 createEncryptedConnection과 createUnencryptedConnection이라는 두 개의 서로 다른 API를 노출합니다.
 * 루트 App 컴포넌트는 사용자가 암호화 사용 여부를 선택할 수 있도록 한 다음,
 * 해당 API 메서드를 하위 ChatRoom 컴포넌트에 createConnection prop으로 전달합니다.
 *
 * 처음에는 콘솔 로그에 연결이 암호화되지 않았다고 표시됩니다.
 * 체크 박스를 켜면 아무 일도 일어나지 않습니다.
 * 그러나 그 후에 선택한 대화방을 변경하면 채팅이 다시 연결되고 콘솔 메시지에서 볼 수 있듯이 암호화가 활성화됩니다.
 * 이것은 버그입니다. 체크 박스를 토글해도 채팅이 다시 연결되도록 버그를 수정했습니다.
 */
import { useState } from 'react';
import ChatRoom from './ChatRoom.js';
import {
    createEncryptedConnection,
    createUnencryptedConnection,
} from './chat.js';

export default function App() {
    const [roomId, setRoomId] = useState('general');
    const [isEncrypted, setIsEncrypted] = useState(false);
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
            <label>
                <input
                    type="checkbox"
                    checked={isEncrypted}
                    onChange={e => setIsEncrypted(e.target.checked)}
                />
                Enable encryption
            </label>
            <hr />
            <ChatRoom
                roomId={roomId}
                createConnection={isEncrypted ?
                    createEncryptedConnection :
                    createUnencryptedConnection
                }
            />
        </>
    );
}
