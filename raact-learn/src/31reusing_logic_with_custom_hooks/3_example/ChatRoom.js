import { useState, useEffect } from 'react';
import { createConnection } from './chat.js';
import { showNotification } from './notifications.js';
import {useChatRoom} from "./useChatRoom";

export default function ChatRoom({ roomId }) {
    const [serverUrl, setServerUrl] = useState('https://localhost:1234');

    useChatRoom({
        roomId: roomId,
        serverUrl: serverUrl,
        onReceiveMessage(msg) {
            showNotification('New message: ' + msg);
        }
    });

    return (
        <>
            <label>
                Server URL:
                <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
            </label>
            <h1>Welcome to the {roomId} room!</h1>
        </>
    );
}
