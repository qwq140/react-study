export function createConnection(serverUrl, roomId) {
    // 실제 구현은 실제로 서버에 연결했을 것입니다.
    let connectedCallback;
    let timeout;
    return {
        connect() {
            timeout = setTimeout(() => {
                if (connectedCallback) {
                    connectedCallback();
                }
            }, 100);
        },
        on(event, callback) {
            if (connectedCallback) {
                throw Error('핸들러는 두 번 추가할 수 없습니다.');
            }
            if (event !== 'connected') {
                throw Error('"connected" 이벤트만 지원됩니다.');
            }
            connectedCallback = callback;
        },
        disconnect() {
            clearTimeout(timeout);
        }
    };
}
