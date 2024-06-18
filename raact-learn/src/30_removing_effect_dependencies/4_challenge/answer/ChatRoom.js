import { useState, useEffect } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import {createEncryptedConnection, createUnencryptedConnection} from "./chat";

export default function ChatRoom({ roomId, isEncrypted, onMessage }) {

    const onReceiveMessage = useEffectEvent(onMessage);

    useEffect(() => {
        function createConnection() {
            const options = {
                serverUrl: 'https://localhost:1234',
                roomId: roomId
            };
            if (isEncrypted) {
                return createEncryptedConnection(options);
            } else {
                return createUnencryptedConnection(options);
            }
        }
        const connection = createConnection();
        connection.on('message', (msg) => onReceiveMessage(msg));
        connection.connect();
        return () => connection.disconnect();
    }, [roomId, isEncrypted, onMessage]);

    return <h1>Welcome to the {roomId} room!</h1>;
}
