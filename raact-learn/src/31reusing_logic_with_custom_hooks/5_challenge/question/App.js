/**
 * 챌린지 5 of 5: 엇갈린 움직임 구현하기
 * 이 예시에선 usePointerPosition() Hook이 최근 포인터의 위치를 추적합니다.
 * 커서나 손을 미리보기 화면 위로 이동하면 빨간 점이 움직임을 따라가는 것을 확인할 수 있습니다.
 * 이 위치는 pos1 변수에 저장됩니다.
 *
 * 실제로는 다섯 개의 다른 점이 렌더링되고 있습니다. 모든 점이 같은 위치에 나타나기 때문에 보이지 않습니다.
 * 이 부분을 수정해야 합니다. 대신 구현해야 하는 것은 “엇갈린” 움직임입니다.
 * 각 점이 이전 점의 경로를 “따라야” 합니다.
 * 예를 들어 커서를 빠르게 움직이면 첫 번째 점이 빠르게 뒤쫓고,
 * 두 번째 점이 첫 번째 점을 약간의 지연을 두고 따라가고,
 * 세 번째 점이 두 번째 점을 따라가는 방식으로 움직여야 합니다.
 *
 * useDelayedValue 커스텀 Hook을 구현해야 합니다.
 * 현재 구현은 제공된 value를 반환하지만, 대신 밀리초 이전의 delay를 받으려고 합니다.
 * 이를 위해선 state와 Effect가 필요할 수 있습니다.
 *
 * useDelayedValue를 값을 구현하고 나면 점들이 서로 따라 움직이는 것을 볼 수 있을 것입니다.
 */
import { usePointerPosition } from './usePointerPosition.js';

function useDelayedValue(value, delay) {
    // TODO: 이 Hook 실행하기
    return value;
}

export default function Canvas() {
    const pos1 = usePointerPosition();
    const pos2 = useDelayedValue(pos1, 100);
    const pos3 = useDelayedValue(pos2, 200);
    const pos4 = useDelayedValue(pos3, 100);
    const pos5 = useDelayedValue(pos3, 50);
    return (
        <>
            <Dot position={pos1} opacity={1} />
            <Dot position={pos2} opacity={0.8} />
            <Dot position={pos3} opacity={0.6} />
            <Dot position={pos4} opacity={0.4} />
            <Dot position={pos5} opacity={0.2} />
        </>
    );
}

function Dot({ position, opacity }) {
    return (
        <div style={{
            position: 'absolute',
            backgroundColor: 'pink',
            borderRadius: '50%',
            opacity,
            transform: `translate(${position.x}px, ${position.y}px)`,
            pointerEvents: 'none',
            left: -20,
            top: -20,
            width: 40,
            height: 40,
        }} />
    );
}