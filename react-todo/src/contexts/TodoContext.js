import {createContext, useContext, useReducer, useRef} from "react";

const initialTodos = [];

function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE' :
            return state.concat(action.todo);
        case 'TOGGLE' :
            return state.map((todo) =>
                todo.id === action.id ? {...todo, isDone : !todo.isDone} : todo
            );
        case 'REMOVE' :
            return state.filter((todo) => todo.id !== action.id);
        default :
            throw new Error(`잘못된 action 타입입니다. : ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(1);
    return (
      <TodoStateContext.Provider value={state}>
          <TodoDispatchContext.Provider value={dispatch}>
              <TodoNextIdContext.Provider value={nextId}>
                {children}
              </TodoNextIdContext.Provider>
          </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    );
}

// 커스텀 훅
export function useTodoState() {
    return useContext(TodoStateContext);
}

export function useTodoDispatch() {
    return useContext(TodoDispatchContext);
}

export function useTodoNextId() {
    return useContext(TodoNextIdContext);
}