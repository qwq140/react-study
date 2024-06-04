# 이벤트에 응답하기

## 이벤트 핸들러 추가하기
1. 이벤트 핸들러를 위한 함수를 정의 
2. JSX 태그에 prop 형태로 전달

예시로 진행할 코드
```javascript
export default function Button() {
  return (
    <button>
      I don't do anything
    </button>
  );
}
```
### 이벤트 핸들러 추가하는 과정
1. Button 컴포넌트 내부에 handleClick 함수를 선언
2. 해당 함수 내부 로직을 구현
3. `<button>` JSX에 `onClick={handleClick}`을 추가
```javascript
export default function Button() {
    
    function handleClick() {
        alert('You clicked me');
    }
    
    
    return (
        <button onClick={handleClick}>
            I don't do anything
        </button>
    );
}
```

### 이벤트 핸들러 함수의 특징
- 주로 컴포넌트 내부에서 정의된다.
- handle로 시작하고 그 뒤에 이벤트명을 붙인 함수명을 가진다.

### JSX 내부에서 인라인으로 정의
```javascript
<button onClick={function handleClick() {
  alert('You clicked me!');
}}>
```
- 화살표 함수를 사용
```javascript
<button onClick={() => {
  alert('You clicked me!');
}}>
```

## 이벤트 핸들러 내에서 Prop 읽기
이벤트 핸들러는 컴포넌트 내부에서 선언되기 때문에 해당 컴포넌트의 prop에 접근할 수 있다.
```javascript
function AlertButton({ message, children }) {
    return (
        <button onClick={() => alert(message)}>
            {children}
        </button>
    );
}

export default function Toolbar() {
    return (
        <div>
            <AlertButton message="Playing!">
                Play Movie
            </AlertButton>
            <AlertButton message="Uploading!">
                Upload Image
            </AlertButton>
        </div>
    );
}
```

## 이벤트 핸들러를 Prop으로 전달
```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

function PlayButton({ movieName }) {
  function handlePlayClick() {
    alert(`Playing ${movieName}!`);
  }

  return (
    <Button onClick={handlePlayClick}>
      Play "{movieName}"
    </Button>
  );
}

function UploadButton() {
  return (
    <Button onClick={() => alert('Uploading!')}>
      Upload Image
    </Button>
  );
}

export default function Toolbar() {
  return (
    <div>
      <PlayButton movieName="Kiki's Delivery Service" />
      <UploadButton />
    </div>
  );
}
```
- Toolbar 컴포넌트가 PlayButton, UploadButton을 렌더링
- PlayButton은 handlePlayClick을 Button 내 onClick prop으로 전달
- UploadButton은 `() => alert('Uploading!')`을 Button 내 onClick prop으로 전달

## 이벤트 핸들러 Prop 명명하기
- `<button>`과 `<div>`같은 빌트인 컴포넌트는 `onClick`과 같은 브라우저 이벤트 이름만 지원한다.
- 사용자 정의 컴포넌트에서는 이벤트 핸들러 prop의 이름을 원하는 대로 명명할 수 있다.
- 관습적으로 이벤트 핸들러 prop의 이름은 `on`으로 시작하여 대문자 영문으로 이어진다.

## 이벤트 전파
- 이벤트 핸들러는 해당 컴포넌트가 가진 어떤 자식 컴포넌트의 이벤트를 수신할 수 있다.
```javascript
export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <button onClick={() => alert('Playing!')}>
        Play Movie
      </button>
      <button onClick={() => alert('Uploading!')}>
        Upload Image
      </button>
    </div>
  );
}
```
- 해당 버튼의 onClick이 실행 후에 `<div>`의 onClick이 실행

## 전파 멈추기
- 이벤트 핸들러는 **이벤트 오브젝트**를 유일한 매개변수로 받는다.
- 이벤트 오브젝트를 통해서 전파를 멈출 수 있다.
- 이벤트 오브젝트의 `stopPropagation()`를 이용해서 이벤트가 부모 컴포넌트에 닿지 못하도록 막을 수 있다.
```javascript
function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

export default function Toolbar() {
  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      <Button onClick={() => alert('Playing!')}>
        Play Movie
      </Button>
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    </div>
  );
}
```

## 기본 동작 방지
- 일부 브라우저 이벤트는 그와 관련된 기본 브라우저 동작을 가진다.
- `<form>`의 submit 이벤트는 그 내부의 버튼을 클릭 시 페이지 전체를 리로드하는 것이 기본 동작이다.
```javascript
export default function Signup() {
  return (
    <form onSubmit={() => alert('Submitting!')}>
      <input />
      <button>Send</button>
    </form>
  );
}
```
- `preventDefault()`를 호출하여 막을 수 있다.
