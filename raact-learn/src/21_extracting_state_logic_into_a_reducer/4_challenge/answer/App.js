/**
 * 챌린지 4 of 4: 처음부터 useReducer 구현해보기
 * 앞선 예시들에서는, useReducer hook을 React에서 불러와 사용했습니다.
 * 이번에는 useReducer 훅 자체를 직접 구현해 볼 것입니다! 다음은 시작을 위한 스탭입니다.
 * 10줄 이상의 코드를 작성할 필요가 없습니다.
 *
 * 변경 사항을 테스트하려면 input에 텍스트를 입력하거나 연락처를 선택해보세요.
 */
import { useReducer } from './MyReact.js';
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
    const message = state.messages[state.selectedId];
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
