import { useState, useEffect } from 'react';
import {createEncryptedConnection, createUnencryptedConnection} from "./chat";

// createConnection이 종속성이라는 것은 맞다.
// 이 프로퍼티의 값으로 인라인 함수를 전달하도록 App 컴포넌트를 편집할 수 있기 때문에 createConnection를 추가하는 것은 취약하다.
// App 컴포넌트가 다시 렌더링할 때마다 값이 달라지므로 effect가 너무 자주 동기화될 수 있다.
// isEncrypted를 대신 전달할 수 있다.
export default function ChatRoom({ roomId, isEncrypted }) {
    useEffect(() => {
        const connection = isEncrypted ?
            createEncryptedConnection(roomId) :
            createUnencryptedConnection(roomId);
        connection.connect();
        return () => connection.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomId, isEncrypted]);

    return <h1>Welcome to the {roomId} room!</h1>;
}
