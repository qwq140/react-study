import { useState } from 'react';
import {messengerReducer} from "./messengerReducer";

// useReducer는 reducer 함수와 초기 state를 인자로 받는다.
export function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    // action 객체를 리듀서에 전달
    // reducer는 업데이트할 새로운 state를 반환
    // 반환받은 state를 setState를 통해 UI업데이트
    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}
