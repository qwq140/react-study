import { useState } from 'react';

let initialShapes = [
    { id: 0, type: 'circle', x: 50, y: 100 },
    { id: 1, type: 'square', x: 150, y: 100 },
    { id: 2, type: 'circle', x: 250, y: 100 },
];

export default function ShapeEditor() {
    const [shapes, setShapes] = useState(
        initialShapes
    );

    function handleClick() {
        const nextShapes = shapes.map(shape => {
            if (shape.type === 'square') {
                // 변경시키지 않고 반환합니다.
                return shape;
            } else {
                // 50px 아래로 이동한 새로운 원을 반환합니다.
                return {
                    ...shape,
                    y: shape.y + 50,
                };
            }
        });
        // 새로운 배열로 리렌더링합니다.
        setShapes(nextShapes);
    }

    return (
        <>
            <button onClick={handleClick}>
                Move circles down!
            </button>
            {shapes.map(shape => (
                <div style={{
                    background: 'purple',
                    position: 'absolute',
                    left: shape.x,
                    top: shape.y,
                    borderRadius:
                        shape.type === 'circle'
                            ? '50%' : '',
                    width: 20,
                    height: 20,
                }} />
            ))}
        </>
    );
}
