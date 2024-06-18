/**
 * 챌린지 2 of 4: 애니메이션을 다시 촉발하는 현상 고치기
 * 이 예시에서는 “Show”를 누르면 환영 메시지가 페이드인 합니다.
 * 애니메이션은 1초 정도 걸립니다.”Remove”를 누르면 환영 메시지가 즉시 사라집니다.
 * 페이드인 애니메이션의 로직은 animation.js 파일에서 일반 자바스크립트 애니메이션 루프로 구현됩니다.
 * 이 로직을 변경할 필요는 없습니다. 서드파티 라이브러리로 처리하면 됩니다.
 * Effect는 돔 노드에 대한 FadeInAnimation 인스턴스를 생성한 다음 start(duration) 또는 stop()을 호출하여 애니메이션을 제어합니다.
 * duration은 슬라이더로 제어합니다. 슬라이더를 조정하여 애니메이션이 어떻게 변하는지 확인하세요.
 *
 * 이 코드는 이미 작동하지만 변경하고 싶은 부분이 있습니다.
 * 현재 duration State 변수를 제어하는 슬라이더를 움직이면 애니메이션이 다시 촉발됩니다.
 * Effect가 duration 변수에 “반응”하지 않도록 동작을 변경하세요.
 * “Show”를 누르면 Effect는 슬라이더의 현재 duration을 사용해야 합니다.
 * 그러나 슬라이더를 움직이는 것만으로 애니메이션이 다시 촉발되어서는 안 됩니다.
 */
import { useState, useEffect, useRef } from 'react';
import { experimental_useEffectEvent as useEffectEvent } from 'react';
import { FadeInAnimation } from './animation.js';

function Welcome({ duration }) {
    const ref = useRef(null);

    useEffect(() => {
        const animation = new FadeInAnimation(ref.current);
        animation.start(duration);
        return () => {
            animation.stop();
        };
    }, [duration]);

    return (
        <h1
            ref={ref}
            style={{
                opacity: 0,
                color: 'white',
                padding: 50,
                textAlign: 'center',
                fontSize: 50,
                backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
            }}
        >
            Welcome
        </h1>
    );
}

export default function App() {
    const [duration, setDuration] = useState(1000);
    const [show, setShow] = useState(false);

    return (
        <>
            <label>
                <input
                    type="range"
                    min="100"
                    max="3000"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                />
                <br />
                Fade in duration: {duration} ms
            </label>
            <button onClick={() => setShow(!show)}>
                {show ? 'Remove' : 'Show'}
            </button>
            <hr />
            {show && <Welcome duration={duration} />}
        </>
    );
}
