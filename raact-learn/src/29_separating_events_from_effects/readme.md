# Effect에서 이벤트 분리하기

## 이벤트 핸들러와 Effect 중에 선택하기

채팅방 컴포넌트를 구현한다고 가정한다. 다음과 같은 요구사항을 가진다.
1. 채팅방 컴포넌트는 선택된 채팅방에 자동으로 연결
2. "전송" 버튼을 클릭하면 채팅에 메시지를 전송

### 이벤트 핸들러는 특정 상호작용에 대한 응답으로 실행된다.
사용자 관점에서 메시지는 "전송"버튼이 클릭 되었기 때문에 전송되어야 한다.
그러므로 메시지를 전송하는 건 이벤트 핸들러가 되어야 한다.
```javascript
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');
  // ...
  function handleSendClick() {
    sendMessage(message);
  }
  // ...
  return (
    <>
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={handleSendClick}>전송</button>
    </>
  );
}
```

### Effect는 동기화가 필요할 때마다 실행된다
- 채팅방과의 연결을 하는 것은 어떤 특정 상호작용이 아니다.
- 사용자가 채팅방 화면을 보고 상호작용을 할 수 있으므로 계속 연결되어 있어야 한다.
- 사용자가 아무런 상호작용을 하지 않은 경우라 해도 연결되어 있어야 한다.
- 그러므로 채팅방 연결 코드는 Effect이다.
```javascript
function ChatRoom({ roomId }) {
  // ...
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```
컴포넌트가 현재 선택된 방과 동기화된 상태를 유지할 것이고 필요할 때마다 다시 연결할 것을 Effect가 보장한다.

## 반응형 값과 반응형 로직
반응형 값 : 컴포넌트 본문 내부에 선언된 props, state 변수  
아래의 예시에서는 `roomId`와 `message`는 반응형 값이고 serverUrl은 반응형 값이 아니다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  // ...
}
```
- 이벤트 핸들러 내부의 로직은 반응형이 아니다.
  - 이벤트 핸들러는 변화에 "반응"하지 않으면서 반응형 값을 읽을 수 있다.
- Effect 내부의 로직은 반응형이다.
  - Effect에서 반응형 값을 읽는 경우 그 값을 의존성으로 지정해야 한다.
  - 리렌더링이 그 값을 바꾸는 경우 React가 새로운 값으로 Effect의 로직을 다시 실행한다.

### 이벤트 핸들러 내부의 로직은 반응형이 아니다
```javascript
    // ...
    sendMessage(message);
    // ...
```
사용자 관점에서 `message`를 바꾸는 것이 메시지를 전송하고 싶다는 의미는 아니다.
사용자가 입력 중이라는 의미이다. 즉 메시지를 전송하는 로직은 반응형이어서는 안된다.
반응형 값이 변경되었다는 이유만으로 로직이 재실행되어서는 안 된다. 그러므로 이벤트 핸들러에 속한다.
```javascript
  function handleSendClick() {
    sendMessage(message);
  }
```
이벤트 핸들러는 반응형이 아니므로 사용자가 전송 버튼을 클릭할 때만 실행된다.

### Effect 내부의 로직은 반응형이다.
```javascript
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // ...
```
사용자 관점에서 roomId를 바꾸는 것은 다른 방에 연결하고 싶다는 것이다.
즉 방에 연결하기 위한 로직은 반응형이어야 한다. 위 코드가 반응형 값을 따라가고 그 값이 바뀌면 다시 실행되기를 원한다.
그러므로 Effect 로직이다.
```javascript
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId]);
```

## Effect에서 비반응형 로직 추출하기
채팅 연결할 때 알림을 보여주는 상황이라고 가정한다. 올바른 색상의 알림을 보여주기 위해 props로부터 현재 테마를 읽는다.
```javascript
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('연결됨!', theme);
    });
    connection.connect();
    // ...
```
`theme`은 반응형 값이고 Effect가 읽는 모든 반응형 값은 의존성으로 선언되어야 한다.
```javascript
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('연결됨!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]); // ✅ 모든 의존성 선언됨
  // ...
```
이렇게 되면 `theme`를 전환할 때마다 채팅이 다시 연결된다.
```javascript
      // ...
      showNotification('연결됨!', theme);
      // ...
```
이 비반응형 로직을 반응형 Effect로부터 분리할 방법이 필요하다.

### Effect Event 선언하기
이 비반응형 로직을 Effect에서 추출하려면 `useEffectEvent`라는 특수한 Hook을 사용한다.

```javascript
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('연결됨!', theme);
  });
  // ...
```
여기서 `onConnected`를 Effect Event라고 한다.
Effect 로직의 일부이지만 이벤트 핸들러와 훨씬 비슷하게 동작한다.
내부의 로직은 반응형이 아니며 항상 props와 state의 최근 값을 바라본다.

Effect 내부에서 Effect Event인 `onConnected`를 호출할 수 있다.
```javascript
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('연결됨!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ 모든 의존성이 선언됨
  // ...
```
이벤트 핸들러는 사용자의 상호작용에 대한 응답으로 실행되는 반면 Effect Event는 Effect에서 직접 트리거 된다는 차이점이 있다.

### Effect Event로 최근 props와 state 읽기
아래의 코드는 페이지 방문을 기록하기 위한 Effect이다.
```javascript
function Page() {
  useEffect(() => {
    logVisit();
  }, []);
  // ...
}
```
`Page`컴포넌트는 현재 경로가 담긴 `url`을 prop으로 받는다.
```javascript
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, []); // 🔴 React Hook useEffect has a missing dependency: 'url'
  // ...
}
```
위의 코드는 URL에 대한 방문을 기록하려는 것이다. `logVisit`호출은 `url`에 반응형이어야 한다.
이 경우 `url`을 의존성으로 추가해야 한다.
```javascript
function Page({ url }) {
  useEffect(() => {
    logVisit(url);
  }, [url]); // ✅ 모든 의존성이 선언됨
  // ...
}
```
모든 페이지 방문기록에 장바구니의 물건 개수도 포함하려 한다고 가정한다.
```javascript
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
  }, [url]); // 🔴 React Hook useEffect has a missing dependency: 'numberOfItems'
  // ...
}
```
Effect 내부에서 `numberOfItems`를 사용했으므로 의존성에 추가하라고 한다.
사용자가 장바구니에 무언가를 넣어 `numberOfItems`가 변경되는 것이 사용자가 페이지를 다시 방문했음을 의미하지 않는다.
```javascript
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    onVisit(url);
  }, [url]); // ✅ 모든 의존성 선언됨
  // ...
}
```
`onVisit`은 Effect Event이고 그 내부의 코드는 반응형이 아니다. 
그러므로 `numberOfItems`의 변경이 재실행시킬 걱정 없이 사용할 수 있다.

### Effect Event의 한계
Effect Event는 사용할 수 있는 방법이 매우 제한적이다.
- Effect 내부에서만 호출해야한다.
- 절대로 다른 컴포넌트나 Hook에 전달하면 안된다.

## 요약
- 이벤트 핸들러는 특정 상호작용에 대한 응답으로 실행된다.
- Effect는 동기화가 필요할 때마다 실행된다.
- 이벤트 핸들러 내부의 로직은 반응형이 아니다.
- Effect 내부의 로직은 반응형이다.
- Effect의 비반응형 로직은 Effect Event로 옮길 수 있다.
- Effect Event는 Effect 내부에서만 호출해라.
- Effect Event를 다른 컴포넌트나 Hook에 전달하지마라.