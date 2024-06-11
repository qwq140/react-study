/**
 * 챌린지 2 of 5: 두 필드를 맞바꾸기
 * 다음 폼은 first name과 last name을 입력받습니다.
 * 또한 어떤 필드가 앞에 가는지를 조절하는 체크 박스로 있습니다.
 * 체크 박스를 선택하면 “Last name” 필드가 “First name” 필드 앞에 나타납니다.
 *
 * 거의 모든 작업에는 버그가 있습니다.
 * “First name”에 입력을 하고 체크 박스를 선택해도 문자열은 “Last name”이 된 첫 번째 인풋에 그대로 있습니다.
 * 순서를 바꿀 때 입력 문자열도 이동하도록 수정해보세요.
 */
import { useState } from 'react';

export default function App() {
    const [reverse, setReverse] = useState(false);
    let checkbox = (
        <label>
            <input
                type="checkbox"
                checked={reverse}
                onChange={e => setReverse(e.target.checked)}
            />
            Reverse order
        </label>
    );
    if (reverse) {
        return (
            <>
                <Field key={"lastName"} label="Last name" />
                <Field key={"firstName"} label="First name" />
                {checkbox}
            </>
        );
    } else {
        return (
            <>
                <Field key={"firstName"} label="First name" />
                <Field key={"lastName"} label="Last name" />
                {checkbox}
            </>
        );
    }
}

function Field({ label }) {
    const [text, setText] = useState('');
    return (
        <label>
            {label}:{' '}
            <input
                type="text"
                value={text}
                placeholder={label}
                onChange={e => setText(e.target.value)}
            />
        </label>
    );
}
