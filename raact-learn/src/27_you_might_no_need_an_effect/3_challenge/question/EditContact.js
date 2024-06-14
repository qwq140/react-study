/**
 * 챌린지 3 of 4: Effect 없이 state 초기화하기
 * 이 EditContact 컴포넌트는 { id, name, email } 모양의 연락처 객체를 savedContact prop으로 받습니다.
 * name과 email input 필드를 편집해 보세요. Save을 누르면 폼 위의 연락처 버튼이 편집된 name으로 업데이트됩니다.
 * Reset을 누르면 폼의 보류 중인 변경 사항이 모두 삭제됩니다. 이 UI를 사용해 보면서 사용법을 익혀보세요.
 *
 * 상단의 버튼으로 연락처를 선택하면 해당 연락처의 세부 정보를 반영하도록 폼이 초기화됩니다.
 * 이 작업은 EditContact.js 내의 Effect로 수행됩니다. 이 Effect를 제거합니다.
 * savedContact.id가 변경될 때 폼을 초기화하는 다른 방법을 찾아보세요.
 */
import { useState, useEffect } from 'react';

export default function EditContact({ savedContact, onSave }) {
    const [name, setName] = useState(savedContact.name);
    const [email, setEmail] = useState(savedContact.email);

    useEffect(() => {
        setName(savedContact.name);
        setEmail(savedContact.email);
    }, [savedContact]);

    return (
        <section>
            <label>
                Name:{' '}
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </label>
            <label>
                Email:{' '}
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </label>
            <button onClick={() => {
                const updatedData = {
                    id: savedContact.id,
                    name: name,
                    email: email
                };
                onSave(updatedData);
            }}>
                Save
            </button>
            <button onClick={() => {
                setName(savedContact.name);
                setEmail(savedContact.email);
            }}>
                Reset
            </button>
        </section>
    );
}
