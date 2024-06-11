# State를 보존하고 초기화하기

## State 는 렌더트리의 위치에 연결 된다.
React는 컴포넌트 UI 트리에 있는 위치를 이용해 React가 가지고 있는 각 state를 알맞은 컴포넌트와 연결한다.

```javascript
import { useState } from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div>
      {counter}
      {counter}
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
위의 코드는 두개의 Counter가 렌더링되고 있다.  
이 둘은 각각 트리에서 자기 고유의 위치에 렌더링되어 있으므로 분리되어있다.  
특정 카운터가 갱신되면, 해당 컴포넌트의 상태만 갱신된다.  
```javascript
export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      <Counter />
      {showB && <Counter />} 
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}
```
리액트는 트리의 동일한 컴포넌트를 동일한 위치에 렌더링하는 동안 상태를 유지한다. Counter를 모두 증가 시키고, 체크박스의 체크해제해서 두 번째 Counter를 제거 후 다시 체크해보면 두 번째 Counter의 state가 초기화된 것을 볼 수 있다.

## 같은 자리의 같은 컴포넌트는 state를 보존한다.
```javascript
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} /> 
      ) : (
        <Counter isFancy={false} /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
체크 박스의 체크 여부에 상관없이 카운터 state는 초기화되지 않는다. `isFancy`가 어떻든 `<Counter/>`는 같은 자리에 있기 때문이다.

> React는 JSX마크업에서가 아닌 UI 트리에서의 위치에 관심이 있다.

## 같은 위치의 다른 컴포넌트는 state를 초기화한다.
```javascript
import { useState } from 'react';

export default function App() {
  const [isPaused, setIsPaused] = useState(false);
  return (
    <div>
      {isPaused ? (
        <p>See you later!</p> 
      ) : (
        <Counter /> 
      )}
      <label>
        <input
          type="checkbox"
          checked={isPaused}
          onChange={e => {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label>
    </div>
  );
}

function Counter() {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
위의 코드는 체크를 하면 `<Counter/>`위치에 다른 컴포넌트로 변경한다. 다른 컴포넌트로 변경될 때 React는 UI트리에서 `Counter`와 state를 제거한다.

```javascript
import { useState } from 'react';

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <div>
          <Counter isFancy={true} /> 
        </div>
      ) : (
        <section>
          <Counter isFancy={false} />
        </section>
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={e => {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label>
    </div>
  );
}

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
같은 위치에 다른 컴포넌트를 렌더링할 때 컴포넌트는 전체 서브 트리의 state를 초기화한다.  
위의 코드는 `<section>`에서 `<div>`로 변경한다. 그 내부에 있던 `<Counter>`의 state는 초기화 된다.  
리렌더링할 때 state를 유지하고 싶다면, 트리 구조가 같아야 한다.

## 같은 위치에서 state를 초기화하기
```javascript
import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}'s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
```
위의 코드는 선수를 바꿔도 점수가 유지된다. 두 `Counter`가 같은 위치에 나타나기 때문에 React는 같은 `Counter`로 본다.  
하지만 우리가 원하는 것은 두 개의 분리된 카운터가 있어야 한다. 같은 위치에 있지만 하나는 Taylor의 카운터, 다른 하나는 Sarah의 카운터이다.

state를 초기화하는 방법
1. 다른 위치에 컴포넌트 렌더링
2. 각 컴포넌트에 `key`로 명시적인 식별자를 제공

## 1. 다른 위치에 컴포넌트를 렌더링하기
```javascript
export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }
      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}
```
- `isPlayer`가 true일 때 첫 번째 자리에 `Counter`가 있고 두 번째 자리는 빕어있다.
- "Next player"를 클릭하면 첫 번째 자리는 비워지고 두 번째 자리에 `Counter`가 온다.

## 2. key를 이용해 state를 초기화하기
React가 컴포넌트를 구별할 수 있도록 key를 사용할 수 있다.
```javascript
{isPlayerA ? (
    <Counter key="Taylor" person="Taylor" />
) : (
    <Counter key="Sarah" person="Sarah" />
)}
```
`key`를 명시하면 React는 부모 내에서 순서 대신에 `key`자체를 위치의 일부로 사용한다.

## key를 이용해 폼을 초기화하기
[resetting_a_form_with_a_key 코드 참고](./resetting_a_form_with_a_key)

타이핑을 하고 다른 수신자를 선택하면 입력값이 유지되는데 key를 추가함으로서 입력값을 초기화할 수 있다.
