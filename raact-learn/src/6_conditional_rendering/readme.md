# 조건부 렌더링

## 조건부로 JSX 반환하기
진행하는 코드 `6_conditional_rendering/Example1.js`  

if return 문을 통해서 조건에 따라 다른 JSX 트리를 반환할 수 있다.

React에서 제어 흐름은 JavaScript로 처리한다.
```javascript
function Item({ name, isPacked }) {
  if (isPacked) {
    return <li className="item">{name} ✔</li>;
  }
  return <li className="item">{name}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride's Packing List</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="Space suit" 
        />
        <Item 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <Item 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
    </section>
  );
}
```

## 조건부로 null을 사용하여 아무것도 반환하지 않기
- 어떤 경우 아무것도 렌더링하고 싶지 않을 수 있다.
- 이 경우엔 null을 반환해주면 된다.
```javascript
if (isPacked) {
  return null;
}
return <li className="item">{name}</li>;
```

## 조건부로 JSX 포함시키기
```javascript
function Item({ name, isPacked }) {
    if(isPacked){
        return <li className="item">{name} ✔</li>;
    }

    return <li className="item">{name}</li>;
}
```
위의 코드를 삼항 조건 연산자를 사용하여 중복코드를 줄일 수 있다.
```javascript
function Item({ name, isPacked }) {
    return <li className="item">{isPacked ? `${name} ✔` : name}</li>;
}
```

더 많은 JSX를 중첩하기 쉽도록 새로운 줄과 괄호를 추가할 수 있다.
```javascript
function Item({name, isPacked}) {
    return (
        <li className="item">
            {isPacked ? (
                <del>
                    `${name} ✔`
                </del>
            ) : (
                name
            )}
        </li>
    );
}
```

## 논리 AND 연산자 (&&)
논리 AND (&&) 연산자를 이용해서 참일 경우에만 렌더링할 수 있다.
```javascript
function Item({name, isPacked}) {
    return (
        <li className="item">
            {name} {isPacked && '✔'}
        </li>
    );
}
```
JavaScript && 표현식은 왼쪽(조건)이 true이면 오른쪽의 값을 반환한다.

## 변수에 조건부로 JSX를 할당하기
위의 같은 방법이 일반 코드를 작성하는 데 방해가 될 수 있다.  
이 경우 if문과 변수를 사용하면 된다.
```javascript
function Item({name, isPacked}) {
    let itemContent = name;
    if(isPacked) {
        itemContent = name + ' ✔'
    }
    return (
        <li className="item">
            {itemContent}
        </li>
    );
}
```
텍스트뿐만 아니라 임의의 JSX도 가능하다.
```javascript
function Item({name, isPacked}) {
    let itemContent = name;
    if(isPacked) {
        itemContent = (
          <del>
              {name + ' ✔'}
          </del>
        );
    }
    return (
        <li className="item">
            {itemContent}
        </li>
    );
}
```

## 요약
- React에서 JavaScript로 분기 로직을 제어한다.
- 조건부로 if문과 함께 JSX 식을 반환할 수 있다.
- 조건부로 일부 JSX를 변수에 저장한 다음 중괄호를 사용하여 다른 JSX에 포함할 수 있다.
- JSX에서 {cond ? <A /> : <B />}는 cond이면 <A />를 렌더링하고, 그렇지 않으면 <B />를 렌더링한다.
- JSX에서 {cond && <A />}는 cond이면, <A />를 렌더링하되, 그렇지 않으면 아무것도 렌더링하지 않는다.