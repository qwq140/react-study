import { useEffect } from 'react';
import { createConnection } from './chat.js';

export default function ChatRoom({ options }) {

    const {serverUrl, roomId} = options;

    // options 객체에 의존하기 때문에 다시 실행된다.
    // 객체는 의도치 않게 다시 생성될 수 있으므로 의존성 요소로 지정하지 않는 것이 좋다.
    useEffect(() => {
        const connection = createConnection({
            serverUrl : serverUrl,
            roomId : roomId
        });
        connection.connect();
        return () => connection.disconnect();
    }, [serverUrl, roomId]);

    return <h1>Welcome to the {options.roomId} room!</h1>;
}
