/**
 * 챌린지 2 of 3: 변경 사항을 찾아 고치세요
 * 정적인 배경 위에 드래그할 수 있는 박스가 있습니다. select input을 사용해 박스의 색상을 바꿀 수 있습니다.
 *
 * 하지만 문제가 있습니다. 만약 박스를 먼저 옮긴 뒤 색상을 바꾸면,
 * (움직여서는 안되는!) 배경이 박스 위치로 “점프”할 것입니다. 하지만 이것은 발생해선 안 되는 문제입니다.
 * Background의 position prop은 { x: 0, y: 0 }인 initialPosition으로 설정되어 있습니다.
 * 왜 색상이 바뀐 후에 배경이 움직일까요?
 */


import { useState } from 'react';
import Background from './Background.js';
import Box from './Box.js';

const initialPosition = {
    x: 0,
    y: 0
};

export default function Canvas() {
    const [shape, setShape] = useState({
        color: 'orange',
        position: initialPosition
    });

    function handleMove(dx, dy) {
        setShape({
            ...shape,
            position : {
                x : shape.position.x + dx,
                y : shape.position.y + dy,
            }
        });
    }

    function handleColorChange(e) {
        setShape({
            ...shape,
            color: e.target.value
        });
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
