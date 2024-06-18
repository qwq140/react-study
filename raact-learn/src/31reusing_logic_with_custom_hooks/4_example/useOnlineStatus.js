import { useSyncExternalStore } from 'react';

function subscribe(callback) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

export function useOnlineStatus() {
    return useSyncExternalStore(
        subscribe,
        () => navigator.onLine, // 클라이언트의 값을 받아오는 방법
        () => true // 서버의 값을 받아오는 방법
    );
}

