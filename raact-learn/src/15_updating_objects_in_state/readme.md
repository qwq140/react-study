# 객체 State 업데이트하기
- State는 객체를 포함한 모든 종류의 자바스크립트 값을 가질 수 있다.
- state가 가진 객체를 직접 변경해서는 안된다.
- 객체를 업데이트하고 싶을 때는 새로운 객체를 생성해야 한다.

## State를 읽기 전용처럼
- state에 저장한 자바스크립트 객체는 어떤 것이라도 읽기 전용인 것 처럼

예시코드 : Example1.js

아래와 같이 객체를 변경해도 리렌더링은 발생하지 않는다.
```javascript
onPointerMove={e => {
    position.x = e.clientX;
    position.y = e.clientY;
}}
```
- 리액트는 state 설정 함수가 없으면 객체 변경을 알 수 없다.
- 리렌더링을 발생시키려면, 새객체를 생성하여 state 설정 함수로 전달해야한다.
```javascript
onPointerMove={e => {
  setPosition({
    x: e.clientX,
    y: e.clientY
  });
}}
```

## Spread 문법으로 객체 복사

예시코드 : Example2.js

- 새로운 객체를 생성하여 setPerson으로 전달해야한다.
- 단 하나의 필드가 바뀌었기 때문에 기존 존재하는 다른 데이터를 복사해야한다.
```javascript
setPerson({
  firstName: e.target.value, // input의 새로운 first name
  lastName: person.lastName,
  email: person.email
});
```

- `...` Spread 문법을 사용하면 모든 프로퍼티를 각각 복사하지 않아도 된다.
```javascript
setPerson({
  ...person, // 이전 필드를 복사
  firstName: e.target.value // 새로운 부분은 덮어쓰기
});
```

- 여러 input 필드에 단일 이벤트 핸들러 사용하기
```javascript
import { useState } from 'react';

export default function Form() {
    const [person, setPerson] = useState({
        firstName: 'Barbara',
        lastName: 'Hepworth',
        email: 'bhepworth@sculpture.com'
    });

    function handleChange(e) {
        setPerson({
            ...person,
            [e.target.name]: e.target.value
        });
    }

    return (
        <>
            <label>
                First name:
                <input
                    name="firstName"
                    value={person.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Last name:
                <input
                    name="lastName"
                    value={person.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    name="email"
                    value={person.email}
                    onChange={handleChange}
                />
            </label>
            <p>
                {person.firstName}{' '}
                {person.lastName}{' '}
                ({person.email})
            </p>
        </>
    );
}
```
- `e.target.name`은 `<input>` DOM 엘리먼트의 `name`프로퍼티를 나타낸다.

## 중첩된 객체 갱신

예시코드 : Example3.js

```javascript
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
```
위의 객체를 업데이트 해서 리렌더링을 발생시킬려면 새로운 `artwork`객체를 생성하고 `person`객체를 새로 만들어야한다.
```javascript
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
```

`...` Spread 문법을 사용하여 단순하게 함수를 호출할 수 있다.
```javascript
setPerson({
  ...person,
  artwork: {
    ...person.artwork,
    city: 'New Delhi'
  }
});
```

## Immer로 간결한 갱신 로직 작성하기
1. npm install immer use-immer
2. import { useState } from 'react'를 import { useImmer } from 'use-immer'로 교체