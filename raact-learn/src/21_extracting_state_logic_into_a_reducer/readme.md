# state 로직을 reducer로 작성하기
state를 업데이트하는 모든 로직을 reducer를 사용해 컴포넌트 외부로 단일 함수로 통합해 관리할 수 있다.

## reducer를 사용하여 state 로직 통합하기
리팩토링 전 코드
```javascript
import { useState } from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(text) {
    setTasks([...tasks, {
      id: nextId++,
      text: text,
      done: false
    }]);
  }

  function handleChangeTask(task) {
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return task;
      } else {
        return t;
      }
    }));
  }

  function handleDeleteTask(taskId) {
    setTasks(
      tasks.filter(t => t.id !== taskId)
    );
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
```

useState에서 useReducer로 바꾸는 과정
1. state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기
2. reducer 함수 작성하기
3. 컴포넌트에서 reducer 사용하기

## 1. state를 설정하는 것에서 action을 dispatch 함수로 전달하는 것으로 바꾸기
```javascript
function handleAddTask(text) {
  setTasks([...tasks, {
    id: nextId++,
    text: text,
    done: false
  }]);
}

function handleChangeTask(task) {
  setTasks(tasks.map(t => {
    if (t.id === task.id) {
      return task;
    } else {
      return t;
    }
  }));
}

function handleDeleteTask(taskId) {
  setTasks(
    tasks.filter(t => t.id !== taskId)
  );
}
```
세가지 이벤트 핸들러
- 사용자가 "Add"를 눌렀을 때 호출되는 `handleAddTask`
- 사용자가 task를 토글하거나 "저장"을 누르면 호출되는 `handleChangeTask`
- 사용자가 "Delete"를 누르면 호출되는 `handleDeleteTask`

reducer는 state를 설정하여 React에게 "무엇을 할 지"를 지시하는 대신, 이벤트 핸들러에서 "action"을 전달하여 "사용자가 방금 한 일"을 지정한다.
```javascript
function handleAddTask(text) {
  dispatch({
    type: 'added',
    id: nextId++,
    text: text,
  });
}

function handleChangeTask(task) {
  dispatch({
    type: 'changed',
    task: task
  });
}

function handleDeleteTask(taskId) {
  dispatch({
    type: 'deleted',
    id: taskId
  });
}
```
- `dispatch`함수에 넣어준 객체를 "action"이라고 한다.

## 2. reducer 함수 작성하기
- reducer 함수는 state에 대한 로직을 넣는 곳이다.
- reducer 함수는 현재의 state 값과 action 객체 두개의 인자를 받고 다음 state 값을 반환한다.
```javascript
function yourReducer(state, action) {
  // React가 설정하게될 다음 state 값을 반환합니다.
}
```
state 설정 관련 모든 로직을 reducer 함수로 마이그레이션
```javascript
function tasksReducer(tasks, action) {
  if (action.type === 'added') {
    return [...tasks, {
      id: action.id,
      text: action.text,
      done: false
    }];
  } else if (action.type === 'changed') {
    return tasks.map(t => {
      if (t.id === action.task.id) {
        return action.task;
      } else {
        return t;
      }
    });
  } else if (action.type === 'deleted') {
    return tasks.filter(t => t.id !== action.id);
  } else {
    throw Error('Unknown action: ' + action.type);
  }
}
```

## 3. 컴포넌트에서 reducer 사용하기
useState를 useReducer로 바꾸기
```javascript
const [tasks, setTasks] = useState(initialTasks);
```
```javascript
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

useReducer 넘겨받는 파라미터
1. reducer 함수
2. 초기 state 값

useReducer 반환값
1. state를 담을 수 있는 값
2. dispatch 함수(사용자의 action을 reducer 함수에게 전달하게 될 함수)

## useState vs useReducer
- 코드 크기
  - useState를 사용하면 미리 작성해야 하는 코드가 줄어든다.
  - useReducer를 사용하면 reducer 함수 그리고 action을 전달하는 부분 둘 다 작성해야 한다.
  - 여러 이벤트 핸들러에서 비슷한 방식으로 state 업데이트하는 경우 useReducer를 사용하면 코드의 양을 줄이는 데 도움이 될 수 있다.

- 가독성
  - 간단한 state를 업데이트하는 경우 useState가 가독성이 좋다.
  - 복잡한 구조의 state의 경우 useReducer가 가독성이 좋다.

- 디버깅
  - useState의 경우 어디서 state가 잘못 설정됐는지 찾기 어려울 수 있다.
  - useReducer의 경우 로그를 reducer에 추가하여 state가 업데이트되는 모든 부분과 홰 해당 버그가 발생했는지(어떤 action으로 인한 것인지)를 확인할 수 있다.

- 테스팅
  - reducer는 컴포넌트에 의존하지 않는 순수 함수이다. 
  - 이는 reducer를 독립적으로 분리해서 내보내거나 테스트할 수 있다는 것을 의미한다.

## reducer 잘 작성하기
- Reducers는 반드시 순수해야 한다.
  - 입력 값이 같다면 결과 값도 항상 같아야 한다.
  - 요청을 보내거나 timeout을 스케쥴링하거나 사이드 이펙트를 수행해서는 안된다.
- 각 action은 데이터 안에서 여러 변경들이 있더라도 하나의 사용자 상호작용을 설명해야 한다.


