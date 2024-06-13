/**
 * 챌린지 2 of 4: 조건부로 input 필드에 포커스하기
 * 이 form은 두 개의 <MyInput /> 컴포넌트를 렌더링합니다.
 *
 * ”form 보기”를 누르면 두 번째 필드가 자동으로 포커스됩니다.
 * 이는 두 <MyInput /> 컴포넌트 모두 내부의 필드에 포커스를 주려고 하기 때문입니다.
 * 두 개의 입력 필드에 연속해서 focus()를 호출하면 마지막 호출이 항상 “승리하게” 됩니다.
 *
 * 이제 첫 번째 필드에 포커스를 주려면
 * 첫 번째 MyInput 컴포넌트가 true로 설정된 shouldFocus prop을 받도록 변경해야 합니다.
 * 변경된 로직에 따라 MyInput이 받은 shouldFocus prop이 true일 때에만 focus()가 호출되도록 변경해 보세요.
 */
import { useEffect, useRef } from 'react';

export default function MyInput({ shouldFocus, value, onChange }) {
    const ref = useRef(null);

    // TODO: shouldFocus가 true일때만 호출되도록
    useEffect(() => {
        ref.current.focus();
    }, []);

    return (
        <input
            ref={ref}
            value={value}
            onChange={onChange}
        />
    );
}