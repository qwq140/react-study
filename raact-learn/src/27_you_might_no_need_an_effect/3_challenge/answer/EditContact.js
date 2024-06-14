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

/**
 * 해당 Form이 다른 Form이며 state를 보존해서는 안 된다는 것을 React에 알려야 한다.
 * EditContact 컴포넌트를 둘로 분할하고 모든 폼 state를 내부 EditForm 컴포넌트로 이동한다.
 * 내부 EditForm 컴포넌트에 savedContact.id를 key로 전달하여 다른 컴포넌트임을 알린다.
 * 그 결과 EditForm 컴포넌트는 다른 연락처를 선택할 때마다 모든 폼 state를 초기화하고 DOM을 다시 생성한다.
 */
import { useState, useEffect } from 'react';

export default function EditContact(props) {
    return (
      <EditForm {...props} key={props.savedContact.id} />
    );
}

function EditForm({savedContact, onSave}) {
    const [name, setName] = useState(savedContact.name);
    const [email, setEmail] = useState(savedContact.email);

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