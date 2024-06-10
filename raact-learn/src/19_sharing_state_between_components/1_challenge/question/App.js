/**
 * 챌린지 1 of 2: 동기화된 입력
 * 아래 두 입력은 독립적입니다. 두 입력의 동기화 상태를 유지하세요.
 * 한 입력을 수정하면 다른 입력도 같은 문구로 변경되어야 하며 반대 경우도 동일합니다.
 */
import { useState } from 'react';

export default function SyncedInputs() {
    return (
        <>
            <Input label="First input" />
            <Input label="Second input" />
        </>
    );
}

function Input({ label }) {
    const [text, setText] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <label>
            {label}
            {' '}
            <input
                value={text}
                onChange={handleChange}
            />
        </label>
    );
}
