/**
 * 챌린지 1 of 4: 비디오 재생과 멈춤
 * 이 예시에서 버튼은 재생과 멈춤 상태를 토글 합니다.
 * 하지만 실제로 비디오가 재생되거나 멈추기 위해서는 state를 변경하는 것으로 충분하지 않습니다.
 * <video> DOM 요소의 play()와 pause()를 호출해야 합니다. ref를 추가하고 버튼이 작동하게 만들어보세요.
 */
import { useState, useRef } from 'react';

export default function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    function handleClick() {
        const nextIsPlaying = !isPlaying;
        setIsPlaying(nextIsPlaying);
    }

    return (
        <>
            <button onClick={handleClick}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <video width="250">
                <source
                    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                    type="video/mp4"
                />
            </video>
        </>
    )
}
