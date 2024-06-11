/**
 * 챌린지 3 of 4: 탭 전환 시, input 입력 값 복원하기
 * 이 예시에서 선택된 수신자를 바꾸기 위해 탭 버튼을 누르면
 * message를 입력받는 input 필드의 텍스트 값이 항상 지워지도록 되어있습니다.
 *
 * 이렇게 하는 이유는 각 수신자 사이에서 한개의 message 입력 값을 공유하고 싶지 않기 때문입니다.
 * 그런데 이런 방식보다, 앱이 각 연락처에 대한 message 입력 값을 별도로 “기억”하여 선택된 연락처가 전환할 때마다
 * 기억 했던 값을 복원하도록 하는 것이 더 나을 것입니다.
 *
 * 여러분이 할 일은 각 연락처 마다 별도로 message의 초기 값을 기억할 수 있도록 state의 구조를 바꾸는 것입니다.
 * 이 때, reducer, 초기 state 값 그리고 컴포넌트를 조금씩 변경해야할 것입니다.
 */
import { useReducer } from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';
import {
    initialState,
    messengerReducer
} from './messengerReducer';

export default function Messenger() {
    const [state, dispatch] = useReducer(
        messengerReducer,
        initialState
    );
    const message = state.message;
    const contact = contacts.find(c =>
        c.id === state.selectedId
    );
    return (
        <div>
            <ContactList
                contacts={contacts}
                selectedId={state.selectedId}
                dispatch={dispatch}
            />
            <Chat
                key={contact.id}
                message={message}
                contact={contact}
                dispatch={dispatch}
            />
        </div>
    );
}

const contacts = [
    { id: 0, name: 'Taylor', email: 'taylor@mail.com' },
    { id: 1, name: 'Alice', email: 'alice@mail.com' },
    { id: 2, name: 'Bob', email: 'bob@mail.com' }
];
