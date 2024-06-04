# state 업데이트 큐

## React state batches 업데이트
```javascript
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 3);
      }}>+3</button>
    </>
  )
}
```
- 각 렌더링의 state 값은 고정되어 있다.
- setNumber를 몇 번 호출하든 똑같다.
```javascript
setNumber(0 + 1);
setNumber(0 + 1);
setNumber(0 + 1);
```
- React는 state 업데이트를 하기 전에 이벤트 핸들러의 모든 코드가 실행될 때까지 기다린다.

## 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기
- `setNumber(number+1)`와 같은 다음 state 값을 전달하는 대신 
- `setNumber(n=>n+1)`와 같이 이전 큐의 state를 기반으로 다음 state를 계산하는 함수를 전달

```javascript
import { useState } from 'react';

export default function Counter() {
    const [number, setNumber] = useState(0);

    return (
        <>
            <h1>{number}</h1>
            <button onClick={() => {
                setNumber(n => n + 1);
                setNumber(n => n + 1);
                setNumber(n => n + 1);
            }}>+3</button>
        </>
    )
}
```
- `n => n+1`은 updater function이라고 부른다.
1. React는 이벤트 핸들러의 다른 코드가 모두 실행된 후에 이 함수가 처리되도록 큐에 넣는다.
2. 다음 렌더링 중에 React는 큐를 순회하여 최종 업데이트된 state를 제공

## 명명 규칙
- 업데이터 함수 인수의 이름은 해당 state 변수의 첫 글자로 지정하는 것이 일반적이다.

## 요약
- state를 설정하더라도 기존 렌더링의 변수는 변경되지 않으며, 대신 새로운 렌더링을 요청한다.
- React는 이벤트 핸들러가 실행을 마친 후 state를 업데이트를 처리한다. 이를 batching이라고 한다.
- 하나의 이벤트에서 일부 state를 여러 번 업데이트하려면 `setNumber(n => n+1)`업데이터 함수를 사용할 수 있다.

