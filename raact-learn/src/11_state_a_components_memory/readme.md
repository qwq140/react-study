# State : 컴포넌트의 기억 저장소

## 일반 변수로 충분하지 않은 경우
```javascript
import { sculptureList } from './data.js';

export default function Gallery() {
    let index = 0;

    function handleClick() {
        index = index + 1;
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
            <p>
                {sculpture.description}
            </p>
        </>
    );
}
```
`handleClick`이벤트 핸들러는 지역 변수 `index`를 업데이트하고 있다. 하지만 변화를 보이지 않게 하는 이유가 있다.
1. 지역 변수는 렌더링 간에 유지되지 않는다.
2. 지역 변수를 변경해도 렌더링을 일으키지 않는다.

컴포넌트를 업데이트하기 위한 필요
1. 렌더링 사이에 데이터를 유지
2. React가 새로운 데이터로 컴포넌트를 렌더링하도록 유발

`useState`훅이 제공하는 두가지
1. 렌더링 간에 데이터를 유지하기 위한 state변수
2. 변수를 업데이트하고 React가 컴포넌트를 다시 렌더링하도록 하는 state setter 함수

## state 변수 추가하기
1. useState import하기
```javascript
import {useState} from "react";
```

2. useState 사용하기
```javascript
const [index, setIndex] = useState(0);
```
- index : state 변수
- setIndex : state setter 함수

3. 이벤트 핸들러 수정하기
```javascript
function handleClick() {
  setIndex(index + 1);
}
```
- setter 함수를 통해서 업데이트하기

## useState 작동 방식
```javascript
const [index, setIndex] = useState(0);
```
1. 컴포넌트가 처음 렌더링 될 때 `[0, setIndex]`를 반환한다.
2. state를 업데이트 : setIndex(index+1)를 호출하여 React에 index가 1임을 기억하게 하고 렌더링을 유발
3. 컴포넌트가 렌더링 -> `index`를 1로 설정한 것을 기억하므로 `[1,setIndex]`를 반환한다.

## State는 격리되고 비공개로 유지된다.
- State는 화면에서 컴포넌트 인스턴스에 지역적이다.
- 두 곳에서 렌더링하더라도 각각의 복사본은 고유한 state를 가진다.

