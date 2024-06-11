/**
 * 챌린지 5 of 5: 배열에서 잘못 지정된 state 고치기
 * 다음 예시에서 배열의 각 Contact는 “Show email”이 눌렸는지에 대한 state를 갖고 있습니다.
 * Alice의 “Show email”을 누르고 “Show in reverse order” 체크 박스를 선택해보세요.
 * 아래쪽으로 내려간 Alice의 이메일은 닫혀있고 대신 _Taylor_의 이메일이 열려있는 것을 볼 수 있습니다.
 *
 * 순서와 관계없이 확장 state가 각 연락처와 연관되도록 고쳐보세요.
 */
import { useState } from 'react';
import Contact from './Contact.js';

export default function ContactList() {
    const [reverse, setReverse] = useState(false);

    const displayedContacts = [...contacts];
    if (reverse) {
        displayedContacts.reverse();
    }

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    value={reverse}
                    onChange={e => {
                        setReverse(e.target.checked)
                    }}
                />{' '}
                Show in reverse order
            </label>
            <ul>
                {displayedContacts.map((contact, i) =>
                    <li key={contact.id}>
                        <Contact contact={contact} />
                    </li>
                )}
            </ul>
        </>
    );
}

const contacts = [
    { id: 0, name: 'Alice', email: 'alice@mail.com' },
    { id: 1, name: 'Bob', email: 'bob@mail.com' },
    { id: 2, name: 'Taylor', email: 'taylor@mail.com' }
];
