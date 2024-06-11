# Context를 사용해 데이터를 깊게 전달하기
Context를 사용하면 명시적으로 props를 전달해주지 않아도 부모 컴포넌트가 트리에 있는 어떤 자식 컴포넌트에서나 정보를 사용할 수 있다.

## Props 전달하기의 문제점
- prop을 트리를 통해 깊이 전해줘야 하거나, 많은 컴포넌트에서 같은 prop이 필요한 경우 장황하고 불편할 수 있다.
- state를 높게 끌어올리는 것은 "Prop drilling" 상황을 초래할 수 있다.

## Context : Props 전달하기의 대안
- Context는 부모 컴포넌트가 그 아래의 트리 전체에 데이터를 전달할 수 있도록 해준다.

[context 사용 전 코드](./before_refactoring_with_context)

- Context를 이용하여 리팩토링하는 과정
    1. Context를 생성 : `LevelContext`
    2. 데이터가 필요한 컴포넌트에서 context 사용 : `Heading`에서 `LevelContext` 사용
    3. 데이터를 지정하는 컴포넌트에서 context 제공 : `Section`에서 `LevelContext` 제공

## 1. Context 생성하기
```javascript
import { createContext } from 'react';

export const LevelContext = createContext(1);
```
- createContext로 context를 생성할 수 있다.
- 파라미터로 기본값을 받는다.

## 2. Context 사용하기
```javascript
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```
- Heading 컴포넌트에서 `level`을 props에서 읽어오는 것이 아닌 context에서 값을 읽도록 한다.
- `useContext`는 React에게 `Heading` 컴포넌트가 `LevelContext`를 읽으려 한다고 알려준다.
```javascript
<Section level={4}>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
  <Heading>Sub-sub-heading</Heading>
</Section>
```
- `Heading`컴포넌트 대신 부모 컴포넌트인 `Section`컴포넌트가 level를 받는다.

## 3. Context 제공하기
```javascript
import {LevelContext} from "./LevelContext";

export default function Section({ level, children }) {
    return (
        <section className="section">
            <LevelContext.Provider value={level}>
                {children}
            </LevelContext.Provider>
        </section>
    );
}
```
- LevelContext를 자식들에게 제공하기 위해 context provider로 감싸준다.
- React에게 `Section`내의 어떤 컴포넌트가 `LevelContext`를 요구하면 `level`을 주라고 알려준다.
- 컴포넌트는 그 위에 있는 UI트리에서 가장 가까운 `<LevelContext.Provider>`의 값을 사용한다.

## 같은 컴포넌트에서 context를 사용하며 제공하기
```javascript
export default function Page() {
  return (
    <Section level={1}>
      ...
      <Section level={2}>
        ...
        <Section level={3}>
          ...
```
- Section에 `level`을 수동으로 지정해야 한다.
- Context를 통해 위의 컴포넌트에서 정보를 읽을 수 있다.
- `Section`은 위의 `Section`에서 `level`을 읽고 자동으로 전달할 수 있다.
```javascript
import { useContext } from 'react';
import { LevelContext } from './LevelContext.js';

export default function Section({ children }) {
  const level = useContext(LevelContext);
  return (
    <section className="section">
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
```

## Context로 중간 컴포넌트 지나치기
[context passes through intermediate components 코드](./context_passes_through_intermediate_components)
- Context를 사용하면 렌더링 되는 위치에 따라 자신을 다르게 표시하는 컴포넌트를 작성할 수 있다.
- 서로 다른 React context는 영향을 주지 않는다.

## Context를 사용하기 전에 고려할 것
어떤 props를 여러 레벨 깊이 전달해야 한다고 해서 해당 정보를 context에 넣어야 하는 것은 아니다.

context를 사용하기 전 고려해볼 대안
1. Props 전달하기로 시작
2. 컴포넌트를 추출하고 JSX를 `children`으로 전달하기

## Context 사용 예시
- 테마 지정하기
- 현재 계정
- 라우팅
- 상태 관리

