# 컴포넌트에 props 전달하기

## 컴포넌트에 props 전달하기
### 1. 자식 컴포넌트에 props 전달하기
```javascript
export default function Profile() {
  return (
    <Avatar
      person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
      size={100}
    />
  );
}
```
Avatar 컴포넌트에 props를 전달(person(객체), size(숫자))

### 2. 자식 컴포넌트 내부에서 props 읽기
```javascript
export default function Avatar({ person, size }) {
    return (
        <img
            className="avatar"
            src={getImageUrl(person)}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}
```
{}를 사용하여 person과 size를 받아올 수 있다.

props는 컴포넌트에 대한 유일한 인자이다. React 컴포넌트 함수는 props 객체를 받는다.  
보통 전체 props 자체를 필요로 하지는 않기에, 개별 props로 구조 분해 할당한다.

구조 분해 할당
```javascript
function Avatar({ person, size }) {
    // ...
}
```
아래의 함수와 같다.
```javascript
function Avatar(props) {
  let person = props.person;
  let size = props.size;
  // ...
}
```

## prop의 기본값 지정하기
```javascript
function Avatar({ person, size = 100 }) {
  // ...
}
```
size를 전달받지 못하면 기본적으로 100으로 설정된다  
기본값은 size prop이 없거나 `size={undefined}`로 전달될 때 사용된다.
그러나 `size={null}`또는 `size={0}`으로 전달되면 기본값은 사용되지 않는다.

## JSX spread 문법으로 props 전달하기
```javascript
function Profile({ person, size, isSepia, thickBorder }) {
  return (
    <div className="card">
      <Avatar
        person={person}
        size={size}
        isSepia={isSepia}
        thickBorder={thickBorder}
      />
    </div>
  );
}
```
위의 코드를 spread 문법을 이용하여 코드를 간결하게 변경
```javascript
function Profile(props) {
  return (
    <div className="card">
      <Avatar {...props} />
    </div>
  );
}
```

## 자식을 JSX로 전달하기
```javascript
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar
        size={100}
        person={{ 
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card>
  );
}
```
- JSX 태그 내에 콘텐츠를 중첩하면, 부모 컴포넌트는 해당 콘텐츠를 `children`이라는 prop으로 받을 것이다.
- `<Card>`컴포넌트는 `<Avatar/>`로 설정된 `children` prop을 받아 이를 래퍼 div에 렌더링 할 것이다.

## 요약
- Props를 전달하려면 JSX에 props를 추가한다.
- Props를 읽으려면 `function Avatar({person, size})` 구조 분해 할당 문법을 사용한다.
- `size=100`과 같은 기본값을 지정할 수 있고, 누락되거나 undefined인 props에 사용된다.
- 모든 props를 `<Avatar {...props}/>`로 전달할 수 있다. JSX spread 문법을 사용할 수 있지만 과도하게는 사용하지 말라.
- `<Card><Avatar /></Card>`와 같이 중첩된 JSX는 `Card`컴포넌트의 자식 컴포넌트로 나타난다.
- Props는 읽기 전용 스냅샷으로, 렌더링 할 때마다 새로운 버전의 props를 받는다.
- Props는 변경할 수 없다. 상호작용이 필요한 경우 state를 설정해야 한다.

