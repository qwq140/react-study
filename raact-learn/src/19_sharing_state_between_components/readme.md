# 컴포넌트 간 State 공유하기
- 각 컴포넌트에서 state를 제거
- 가장 가까운 공통의 부모 컴포넌트로 state 옮기기
- props로 부모 컴포넌트로 부터 전달 받기

## State 끌어올리기 예제

예시 컴포넌트 구조
- Accordion
  - Panel
  - Panel

각 `Panel` 컴포넌트는 콘텐츠 표시 여부를 결정하는 `isActive`상태를 가진다.

```javascript
import { useState } from 'react';

function Panel({ title, children }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}
```
한 패널의 버튼을 클릭하면 다른 패널에는 영향을 미치지 않는다.

수정 방향  
- 한 번에 하나의 패널만 열리도록 수정

패널을 조정하기 위한 "State 끌어올리기" 단계
1. 자식 컴포넌트의 state를 제거
2. 하드 코딩된 값을 공통의 부모로부터 전달
3. 공통의 부모에 state를 추가하고 이벤트 핸들러와 함께 전달

## 1. 자식 컴포넌트에서 state 제거하기
- `Panel` 컴포넌트에서 `isActive` state를 제거한다.
- `Panel`의 prop 목록에 `isActive`를 추가한다.
```javascript
function Panel({ title, children, isActive }) {
```


## 2. 하드 고딩된 데이터를 부모 컴포넌트로 전달하기
state를 올릴려면, 조정하려는 두 자식 컴포넌트의 가장 가까운 공통 부모 컴포넌트에 두어야한다.
- Accordion
  - Panel
  - Panel

`Accordion`컴포넌트가 하드 코딩된 값을 가지는 `isActive`를 두 패널에 전달하도록 만든다.
```javascript
import { useState } from 'react';

export default function Accordion() {
  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About" isActive={true}>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology" isActive={true}>
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={() => setIsActive(true)}>
          Show
        </button>
      )}
    </section>
  );
}
```

## 3. 공통 부모에 state 추가하기
- 한 번에 하나의 패널만 활성화되어야 한다.
- 공통 부모 컴포넌트인 `Accordion`은 어떤 패널이 활성화된 패널인지 추적하고 있어야 한다.
- state를 `boolean`값을 사용하는 대신, 활성화되어있는 `Panel`의 인덱스 숫자를 사용할 수 있다.
```javascript
const [activeIndex, setActiveIndex] = useState(0);
```
- 패널에서 버튼을 클릭하면 `Accordion`의 활성화된 인덱스를 변경
- `Panel` 컴포넌트가 state를 변경할 수 있음을 이벤트 핸들러를 prop으로 전달을 통해 허용
```javascript
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
```
- `Panel`내에서 `<button>`은 `onShow` prop을 클릭 이벤트로 사용