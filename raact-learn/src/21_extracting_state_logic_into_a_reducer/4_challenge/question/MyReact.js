import { useState } from 'react';
import {messengerReducer} from "./messengerReducer";

export function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    // ???

    return [state, dispatch];
}
