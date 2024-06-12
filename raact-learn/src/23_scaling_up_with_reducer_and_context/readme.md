# Reducer와 Context로 앱 확장하기

## Reducer와 context를 결합하기
[예시 코드](./before_refactoring)

- `tasks` state 및 `dispatch`함수는 최상위 `TaskApp`컴포넌트에서만 사용할 수 있다.
- 다른 컴포넌트가 읽고 변경하려면 state 및 이벤트 핸들러를 props로 전달해야한다.
- 만약 수십 수백개의 컴포넌트를 거쳐야 한다면 전달하기가 쉽지 않다.
- state와 dispatch를 context에 넣음으로서 해소할 수 있다.

Reducer와 context를 결합하는 방법
1. Context를 생성한다.
2. State와 dispatch 함수를 context에 넣는다.
3. 트리 안에서 context를 사용한다.

## 1. Context 생성
```javascript
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```
트리를 통해 전달하려면, 두 개의 context를 생성해야한다.
- TasksContext : 현재 tasks 리스트 제공
- TasksDispatchContext : 컴포넌트에서 action을 dispatch 하는 함수를 제공

## 2. State와 dispatch 함수를 context에 넣기
`useReducer()`에서 반환된 `tasks`및 `dispatch`를 트리 전체에 제공
```javascript
export default function TaskApp() {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  // ...
  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        ...
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

## 3. 트리 안에서 context 사용하기
- state 및 이벤트 핸들러를 props로 전달할 필요없다.
- useContext를 사용하여 접근하면 된다.
- tasks가 필요한 컴포넌트에서는 TasksContext에서 접근
  - `TaskList`
- dispatch가 필요한 컴포넌트(tasks 리스트 업데이트)에서는 TasksDispatchContext에서 접근
  - `AddTask`, `Task`

## 하나의 파일로 합치기
- `TasksContext.js`에 reducer 코드 추가
- `TasksProvider`컴포넌트를 새로 선언
  1. Reducer로 state 관리
  2. 두 context를 모두 하위 컴포넌트에 제공
  3. `children`을 prop으로 받아 JSX를 전달

```javascript
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
```

- context를 사용하기 위한 use함수 export
```javascript
export function useTasks() {
  return useContext(TasksContext);
}

export function useTasksDispatch() {
  return useContext(TasksDispatchContext);
}
```

