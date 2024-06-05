/**
 * 챌린지 3 of 3: Immer로 객체 업데이트하기
 * 이것은 이전 챌린지와 비슷한, 버그가 있는 예제입니다.
 * 이번에는 Immer를 사용해서 변경을 고쳐 보세요.
 * 편의를 위해 useImmer는 이미 포함되어 있으므로 사용하기 위해서는 shape state 변수를 바꿔야 합니다.
 */

import { useImmer } from 'use-immer';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
    x: 0,
    y: 0
};

export default function Canvas() {
    const [shape, updateShape] = useImmer({
        color: 'orange',
        position: initialPosition
    });

    function handleMove(dx, dy) {
        updateShape(draft => {
            draft.position.x += dx;
            draft.position.y += dy;
        });
    }

    function handleColorChange(e) {
        updateShape(draft => draft.color = e.target.value);
    }

    return (
        <>
            <select
                value={shape.color}
                onChange={handleColorChange}
            >
                <option value="orange">orange</option>
                <option value="lightpink">lightpink</option>
                <option value="aliceblue">aliceblue</option>
            </select>
            <Background
                position={initialPosition}
            />
            <Box
                color={shape.color}
                position={shape.position}
                onMove={handleMove}
            >
                Drag me!
            </Box>
        </>
    );
}
