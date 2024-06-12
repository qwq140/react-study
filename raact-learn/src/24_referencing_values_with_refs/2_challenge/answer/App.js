/**
 * 챌린지 2 of 4: 리렌더를 못하는 컴포넌트 수정
 * 이 버튼은 “On”과 “Off”를 표시하게 되어 있습니다.
 * 그러나 항상 “Off”로 표시됩니다. 코드가 뭐가 잘못됐나요? 고쳐봅시다.
 */
import {useState} from 'react';

export default function Toggle() {
    const [isOn, setIsOn] = useState(false);

    return (
        <button onClick={() => {
            setIsOn(!isOn);
        }}>
            {isOn ? 'On' : 'Off'}
        </button>
    );
}
