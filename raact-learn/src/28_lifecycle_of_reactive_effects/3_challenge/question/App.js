/**
 * 챌린지 3 of 5: 오래된 값 버그 조사하기
 * 이 예제에서는 체크박스가 켜져 있으면 분홍색 점이 움직여야 하고 체크박스가 꺼져 있으면 움직임을 멈춰야 합니다.
 * 이를 위한 로직은 이미 구현되어 있습니다. handleMove 이벤트 핸들러는 canMove state 변수를 확인합니다.
 *
 * 그러나 어떤 이유에서인지 handleMove 내부의 canMove state 변수는 체크박스를 체크한 후에도 항상 true인 “오래된” state인 것처럼 보입니다.
 * 어떻게 이런 일이 가능할까요? 코드에서 실수를 찾아서 수정하세요.
 */
import { useState, useEffect } from 'react';

export default function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [canMove, setCanMove] = useState(true);

    function handleMove(e) {
        if (canMove) {
            setPosition({ x: e.clientX, y: e.clientY });
        }
    }

    useEffect(() => {
        window.addEventListener('pointermove', handleMove);
        return () => window.removeEventListener('pointermove', handleMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <label>
                <input type="checkbox"
                       checked={canMove}
                       onChange={e => setCanMove(e.target.checked)}
                />
                The dot is allowed to move
            </label>
            <hr />
            <div style={{
                position: 'absolute',
                backgroundColor: 'pink',
                borderRadius: '50%',
                opacity: 0.6,
                transform: `translate(${position.x}px, ${position.y}px)`,
                pointerEvents: 'none',
                left: -20,
                top: -20,
                width: 40,
                height: 40,
            }} />
        </>
    );
}
