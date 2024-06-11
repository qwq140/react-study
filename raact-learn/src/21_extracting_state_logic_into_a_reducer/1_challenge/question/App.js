/**
 * 챌린지 1 of 4: 이벤트 핸들러에서 action 전달하기
 * 현재 ContactList.js와 Chat.js의 이벤트 핸들러 안에는
 * // TODO 주석이 있습니다.
 * 이 때문에 input에 값을 입력해도 동작하지 않고 탭 버튼을 클릭해도 선택된 수신인이 변경할 수 없습니다.
 *
 * // TODO 주석이 있는 부분을 지우고
 * 상황에 맞는 action을 전달(dispatch)하는 코드를 작성해보세요.
 * action에 대한 힌트를 얻고 싶다면 messengerReducer.js에 구현된 reducer를 확인해보세요.
 * 이 reducer는 이미 작성되어있기 때문에 변경할 필요가 없습니다.
 * 여러분은 ContactList.js와 Chat.js에 action을 담아 전달하는 코드를 작성하기만 하면 됩니다.
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
