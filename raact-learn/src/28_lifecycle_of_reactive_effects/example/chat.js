export function createConnection(serverUrl, roomId) {
    // 실제 구현은 실제로 서버에 연결됩니다.
    return {
        connect() {
            console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
        },
        disconnect() {
            console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
        }
    };
}
