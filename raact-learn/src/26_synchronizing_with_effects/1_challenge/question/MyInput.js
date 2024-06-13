/**
 * 챌린지 1 of 4: 마운트시 input 필드에 포커스하기
 * 이 예시에서는 form이 <MyInput /> 컴포넌트를 렌더링합니다.
 *
 * 화면에 나타날 때 MyInput이 자동으로 포커스되도록 입력의 focus() 메서드를 사용하세요.
 * 이미 주석 처리된 구현이 있지만 제대로 작동하지 않습니다. 왜 작동하지 않는지 확인하고 수정해 보세요.
 * (autoFocus 속성은 존재하지 않는 것으로 가정하세요. 우리는 처음부터 동일한 기능을 다시 구현하고 있습니다.)
 */
import { useEffect, useRef } from 'react';

export default function MyInput({ value, onChange }) {
    const ref = useRef(null);

    // TODO: 작동하지 않는다. 고쳐야함
    // ref.current.focus()

    return (
        <input
            ref={ref}
            value={value}
            onChange={onChange}
        />
    );
}
