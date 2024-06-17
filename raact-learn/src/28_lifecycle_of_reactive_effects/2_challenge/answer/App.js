/**
 * 챌린지 2 of 5: 동기화 켜기 및 끄기
 * 이 예제에서 effect는 창 pointermove 이벤트를 구독하여 화면에서 분홍색 점을 이동합니다.
 * 미리 보기 영역 위로 마우스를 가져가서(또는 모바일 장치에서 화면을 터치하여) 분홍색 점이 어떻게 움직이는지 확인해 보세요.
 *
 * 체크박스도 있습니다. 체크 박스를 선택하면 canMove state 변수가 토글되지만
 * 이 state 변수는 코드의 어느 곳에서도 사용되지 않습니다.
 *
 * 여러분의 임무는 canMove가 false일 때(체크박스가 체크된 상태) 점의 이동이 중지되도록 코드를 변경하는 것입니다.
 * 체크 박스를 다시 켜고 canMove를 true로 설정하면 상자가 다시 움직여야 합니다.
 * 즉, 점이 움직일 수 있는지는 체크 박스의 체크 여부와 동기화 state를 유지해야 합니다.
 */
import { useState, useEffect } from 'react';

export default function App() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [canMove, setCanMove] = useState(true);

    useEffect(() => {
        function handleMove(e) {
            setPosition({ x: e.clientX, y: e.clientY });
        }
        if(canMove) {
            window.addEventListener('pointermove', handleMove);
        }
        return () => window.removeEventListener('pointermove', handleMove);
    }, [canMove]);

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

