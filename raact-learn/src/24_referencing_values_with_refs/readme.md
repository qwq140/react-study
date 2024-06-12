# Ref로 값 참조하기

## 컴포넌트에 ref를 추가하기
`useRef` Hook을 가져와 컴포넌트에 ref를 추가할 수 있다.
```javascript
import { useRef } from 'react';
```
```javascript
const ref = useRef(0);
```
`useRef` 반환 객체
```javascript
{
  current: 0 // useRef에 전달한 값 
}
```

- ref는 문자열, 객체, 함수 등 모든 것을 가리킬 수 있다.
- ref는 읽고 수정할 수 있는 `current`프로퍼티를 가진 일반 자바스크립트 객체이다.
- ref를 변경한다고 해서 다시 리렌더링 되지 않는다.

## ref와 state의 차이
- refs
  - `useRef(initialValue)`는 `{current:initalValue}`을 반환
  - state를 바꿔도 리렌더 되지 않는다.
  - `current`값을 수정 및 업데이트할 수 있다.
  - 렌더링 중에는 `current`값을 읽거나 쓰면 안된다.
- state
  - `useState(initialValue)`은 `[value, setValue]`를 반환한다.
  - state를 바꾸면 리렌더 된다.
  - state를 수정하기 위해서는 state 설정 함수를 사용하여 리렌더 대기열에 넣어야 한다.
  - 언제든지 state를 읽을 수 있다. 각 렌더마다 변경되지 않는 자체적인 state의 snapshot이 있다.

## refs를 사용할 시기
- timeout id를 저장
- DOM 엘리먼트 저장 및 조작
- JSX를 계산하는 데 필요하지 않은 다른 객체 저장

## refs의 좋은 예시
- refs를 escape hatch로 간주
  - Refs는 외부 시스템이나 브라우저 API로 작업할 때 유용하다.
- 렌더링 중에 `ref.current`를 읽거나 쓰지 않기
  - 렌더링 중에 일부 정보가 필요한 경우 state를 사용

## Refs와 DOM
- ref의 가장 일반적인 사용 사례는 DOM 엘레먼트에 액세스하는 것이다.
- JSX의 `ref` 어트리뷰트에 ref를 전달하면 해당 DOM 엘리먼트를 `ref.current`에 넣는다.
