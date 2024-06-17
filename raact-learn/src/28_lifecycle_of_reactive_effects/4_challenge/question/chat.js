export function createEncryptedConnection(roomId) {
    // 실제 구현은 실제로 서버에 연결됩니다.
    return {
        connect() {
            console.log('✅ 🔐 Connecting to "' + roomId + '... (encrypted)');
        },
        disconnect() {
            console.log('❌ 🔐 Disconnected from "' + roomId + '" room (encrypted)');
        }
    };
}

export function createUnencryptedConnection(roomId) {
    // 실제 구현은 실제로 서버에 연결됩니다.
    return {
        connect() {
            console.log('✅ Connecting to "' + roomId + '... (unencrypted)');
        },
        disconnect() {
            console.log('❌ Disconnected from "' + roomId + '" room (unencrypted)');
        }
    };
}
