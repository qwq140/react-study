# Effect 의존성 제거하기

## 의존성은 코드와 일치해야 한다.
Effect를 작성할 때는 먼저 Effect가 수행하기를 원하는 작업을 시작하고 중지하는 방법을 지정한다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  	// ...
}
```

Effect 의존성을 빈 배열로 지정하면 린터가 의존성을 제안한다.

```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- Fix the mistake here!
  //...
```
> 11:6 - React Hook useEffect has a missing dependency: 'roomId'. Either include it or remove the dependency array.

린터에 표시된 내용에 따라 배열을 채운다.
```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
}
```
Effect는 반응형 값에 반응한다. `roomId`는 반응형 값이므로, 린터는 이를 의존성으로 지정햇는지 확인한다.
`roomId`가 다른 값을 받으면 React는 Effect를 다시 동기화한다.

### 의존성을 제거하려면 의존성이 아님을 증명하라
Effect의 코드에서 사용되는 모든 반응형 값은 의존성 목록에 선언되어야 한다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) { // This is a reactive value
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // This Effect reads that reactive value
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ So you must specify that reactive value as a dependency of your Effect
  // ...
}
```
반응형 값에는 props와 컴포넌트 내부에서 직접 선언된 모든 변수 및 함수가 포함된다.

**의존성을 제거하려면 해당 컴포넌트가 의존성이 될 필요가 없나는 것을 린터에 증명해야한다.**
```javascript
const serverUrl = 'https://localhost:1234';
const roomId = 'music'; // Not a reactive value anymore

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
}
```
roomId를 컴포넌트 밖으로 이동시키면 반응형 값이 아니고 재렌더링 시에도 변경되지 않음을 증명할 수 있다.

### 의존성을 변경하려면 코드를 변경하라.
1. 먼저 Effect의 코드 또는 반응형 값 선언 방식을 변경한다.
2. 그런 다음, 변경한 코드에 맞게 의존성을 조정한다.
3. 의존성 목록이 마음에 들지 않으면 첫 번째 단계로 돌아간다.

## 불필요한 의존성 제거하기
- 다른 조건에서 Effect의 다른 부분을 다시 실행하고 싶을 수도 있다.
- 일부 의존성의 변경에 반응하지않고 최신 값만 읽고 싶을 수도 있다.
- 의존성은 객체나 함수이기 때문에 의도치 않게 너무 자주 변경될 수 있다.

### 이 코드를 이벤트 핸들러로 옮겨야 하는가?
먼저 이 코드가 Effect되어야 하는지 여부를 고려해야 한다.

제출할 때 `submitted` State 변수를 `true`로 설정한다.
POST 요청을 보내고 알림을 표시해야 한다.
이 로직은 `submitted`가 `true`가 될 때 반응하는 Effect안에 넣었다.
```javascript
function Form() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!');
    }
  }, [submitted]);

  function handleSubmit() {
    setSubmitted(true);
  }

  // ...
}
```
현재 테마에 따라 알림 메시지의 스타일을 지정하고 싶으므로 현재 테마를 읽는다.
`theme`는 컴포넌트 본문에서 선언되었기때문에 반응형 값이므로 의존성으로 추가한다.
```javascript
function Form() {
  const [submitted, setSubmitted] = useState(false);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (submitted) {
      // 🔴 Avoid: Event-specific logic inside an Effect
      post('/api/register');
      showNotification('Successfully registered!', theme);
    }
  }, [submitted, theme]); // ✅ All dependencies declared

  function handleSubmit() {
    setSubmitted(true);
  }  

  // ...
}
```
이렇게 되면 테마를 전환할 때 `theme`가 변경되고 Effect가 다시 실행되어 동일한 알림이 다시 표시된다.

POST 요청을 보내고 알림을 표시하는 것은 특정 상호작용(제출 버튼 클릭)에 대한 응답으로 받고 싶은 것이다.
특정 상호작용에 대한 응답으로 코드를 실행하는 것은 이벤트 핸들러에 직접 넣어야 한다.
```javascript
function Form() {
  const theme = useContext(ThemeContext);

  function handleSubmit() {
    // ✅ Good: Event-specific logic is called from event handlers
    post('/api/register');
    showNotification('Successfully registered!', theme);
  }  

  // ...
}
```

### Effect가 관련 없는 여러 가지 작업을 수행하는가?
다음으로 스스로에게 물어봐야 할 질문은 Effect가 서로 관련이 없는 여러 가지 작업을 수행하고 있는지 여부이다.

사용자가 도시와 지역을 선택해야 하는 배송 폼을 만든다고 가정한다. 
선택한 `country`에 따라 서버에서 `cities`목록을 가져와 드롭다운에 표시한다.
```javascript
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ All dependencies declared

  // ...
```
Effect에서 데이터를 페칭하는 예시이다. `country` props에 따라 `cities` State를 네크워크와 동기화하고 있다.
`ShippingForm`이 표시되는 즉시 그리고 `country`가 변경될 때마다 데이터를 가져와야 하므로 이벤트 핸들러에서는 작업을 수행할 수 없다.

도시 지역에 대한 두 번째  셀렉트박스를 추가하여 현재 선택된 `city`의 `areas`을 가져온다고 가정한다.
```javascript
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);

  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    // 🔴 Avoid: A single Effect synchronizes two independent processes
    if (city) {
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
    }
    return () => {
      ignore = true;
    };
  }, [country, city]); // ✅ All dependencies declared

  // ...
```
Effect가 `city` State 변수를 사용하므로 의존성 목록에 `city`를 추가해야 한다. 
이로 인해 다른 도시를 선택하면 Effect가 다시 실행되어 `fetchCities(country)`를 호출하는 문제가 발생한다.

**위의 코드의 문제점은 서로 관련이 없는 두 가지를 동기화하고 있다는 것이다.**
1. `country` props를 기반으로 `cities` State를 네트워크에 동기화하려고 한다.
2. `city` State를 기반으로 `areas` State를 네트워크에 동기화하려고 한다.

로직을 두 개의 Effect로 분할한다.
```javascript
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  useEffect(() => {
    let ignore = false;
    fetch(`/api/cities?country=${country}`)
      .then(response => response.json())
      .then(json => {
        if (!ignore) {
          setCities(json);
        }
      });
    return () => {
      ignore = true;
    };
  }, [country]); // ✅ All dependencies declared

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  useEffect(() => {
    if (city) {
      let ignore = false;
      fetch(`/api/areas?city=${city}`)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setAreas(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [city]); // ✅ All dependencies declared

  // ...
```
첫번째 Effect는 `country`가 변경될 때만 실행  
두번째 Effect는 `city`가 변경될 때만 실행

### 다음 State를 계산하기 위해 어떤 State를 읽고 있는가?
아래의 Effect는 새 메시지가 도착할 때마다 새로 생성된 배열로 `messages` State를 업데이트한다.
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    // ...
```
`messages`는 Effect에서 읽는 반응형 값이므로 의존성이어야 한다.
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages([...messages, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId, messages]); // ✅ All dependencies declared
  // ...
```
메시지를 수신할 때마다 `setMessages()`는 컴포넌트 수신된 메시지를 포함되는 새 `messages`배열로 재렌더링하도록 한다.
하지만 이 Effect는 `messages`에 따라 달라지므로 Effect도 다시 동기화된다.
따라서 새 메시지가 올 때마다 채팅이 다시 연결된다.

이 문제를 해결하려면 Effect 내에서 messages를 읽지 않고, 대신 업데이터 함수를 `setMessages`에 전달하면 된다.
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```
이제 Effect가 `messages`변수를 읽지 않아 의존할 필요가 없어진다.

### 값의 변경에 반응하지 않고 값을 읽기
사용자가 새 메시지를 수신할 때 `isMute`가 `true`가 아닌 경우 사운드를 재생한다고 가정
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    // ...
```
Effect에서 `isMute`를 사용하므로 의존성에 추가해야 한다.
```javascript
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      setMessages(msgs => [...msgs, receivedMessage]);
      if (!isMuted) {
        playSound();
      }
    });
    return () => connection.disconnect();
  }, [roomId, isMuted]); // ✅ All dependencies declared
  // ...
```
`isMuted`가 변경될 때마다 Effect가 다시 동기화되고 채팅에 다시 연결되는 문제가 발생한다.

Effect에서 반응을 해서는 안되는 로직을 추출해야한다. 
이 Effect가 `isMuted`의 변경에 반응하지 않기를 원한다. 
이 비반응 로직을 Effect Event로 옮기면 된다.

```javascript
import { useState, useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  const [isMuted, setIsMuted] = useState(false);

  const onMessage = useEffectEvent(receivedMessage => {
    setMessages(msgs => [...msgs, receivedMessage]);
    if (!isMuted) {
      playSound();
    }
  });

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    connection.on('message', (receivedMessage) => {
      onMessage(receivedMessage);
    });
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```

#### 반응형 코드와 비반응형 코드 분리
`roomId`가 변경될 때마다 방문을 기록하려고 한다. 
모든 로그에 현재 `notificationCount`를 포함하고 싶지만 `notificationCount` 변경으로 로그 이벤트가 촉발하는 것은 원하지 않는다.

해결책은 다시 비반응형 코드를 Effect 이벤트로 분리하는 것이다.
```javascript
function Chat({ roomId, notificationCount }) {
  const onVisit = useEffectEvent(visitedRoomId => {
    logVisit(visitedRoomId, notificationCount);
  });

  useEffect(() => {
    onVisit(roomId);
  }, [roomId]); // ✅ All dependencies declared
  // ...
}
```

### 일부 반응형 값이 의도치 않게 변경
커ㅗㅁ포넌트 본문에 `options`객체를 생성한 다음 Effect 내부에서 해당 객체를 읽는다고 가정
```javascript
function ChatRoom({ roomId }) {
  // ...
  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    // ...
```
`options`객체는 컴포넌트 본문에서 선언되므로 반응형 값이다. 
Effect 내에서 `options`를 읽으므로 의존성으로 선언해야하고 Effect가 변경 사항에 반응하게 된다.
```javascript
  // ...
  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```
`message`를 업데이트할 때마다 컴포넌트가 리렌더링되면서 그 안에 있는 코드가 다시 실행된다.

`ChatRoom`컴포넌트를 리렌더링할 때마다 새로운 `options`객체가 처음부터 새로 생성되고 
React는 `options`객체가 마지막 렌더링 중에 생성된 `options` 객체와 다른 객체임을 인식한다.
그래서 Effect를 다시 동기화하고 사용자가 입력할 때 채팅이 다시 연결된다.

**자바스크립트에서는 새로 생성된 객체와 함수가 다른 모든 객체와 구별되는 것으로 간주된다.**

### 정적 객체와 함수를 컴포넌트 외부로 이동
객체가 props 및 State에 의존하지 않는 경우 해당 객체를 컴포넌트 외부로 이동할 수 있다.
```javascript
const options = {
  serverUrl: 'https://localhost:1234',
  roomId: 'music'
};

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
```
이렇게 되면 리렌더링의 결과로 변경될 수 없으므로 의존성 될 필요가 없다.

함수에도 적용된다.
```javascript
function createOptions() {
  return {
    serverUrl: 'https://localhost:1234',
    roomId: 'music'
  };
}

function ChatRoom() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, []); // ✅ All dependencies declared
  // ...
```

#### Effect 내에서 동적 객체 및 함수 이동
객체가 `roomId` props처럼 리렌더링의 결과로 변경될 수 있는 반응형 값에 의존하는 경우, 
컴포넌트 외부로 끌어낼 수 없다. 하지만 Effect의 코드 내부로 이동시킬 수는 있다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared
  // ...
```
`options`를 Effect 내부로 이동시키면서 메시지 입력을 해도 채팅이 다시 연결되지 않는다.

#### 객체에서 원시 값 읽기
가끔 props에서 객체를 받을 수도 있다.
```javascript
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [options]); // ✅ All dependencies declared
  // ...
```
렌더링 중에 부모 컴포넌트가 객체를 생성한다는 점이 위험하다.
```javascript
<ChatRoom
  roomId={roomId}
  options={{
    serverUrl: serverUrl,
    roomId: roomId
  }}
/>
```
이렇게 하면 부모 컴포넌트가 리렌더링할 때마다 Effect가 다시 연결된다.
Effect 외부의 객체에서 정보를 읽고 객체 및 함수 의존성을 피하는 것이 좋다.

```javascript
function ChatRoom({ options }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = options;
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```
Effect 외부의 객체에서 일부 값을 읽은 다음 Effect 내부에 동일한 값을 가진 객체를 만든다. 
하지만 Effect가 실제로 어떤 정보에 의존하는지 매우 명확하게 알 수 있다.
부모 컴포넌트에 의해 의도치 않게 객체가 다시 생성된 경우 채팅이 다시 연결되지 않는다. 
하지만 `options.roomId`또는 `options.serverUrl`이 실제로 다른 경우 채팅이 다시 연결된다.

#### 함수에서 원시값 계산
부모 컴포넌트가 함수를 전달한다고 가정한다.
```javascript
<ChatRoom
  roomId={roomId}
  getOptions={() => {
    return {
      serverUrl: serverUrl,
      roomId: roomId
    };
  }}
/>
```
의존성을 만들지 않으려면 Effect 외부에서 호출해야한다. 
이렇게 하면 객체가 아니며 Effect 내부에서 읽을 수 있는 `roomId` 및 `serverUrl`값을 얻을 수 있다.
```javascript
function ChatRoom({ getOptions }) {
  const [message, setMessage] = useState('');

  const { roomId, serverUrl } = getOptions();
  useEffect(() => {
    const connection = createConnection({
      roomId: roomId,
      serverUrl: serverUrl
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ All dependencies declared
  // ...
```

## 요약
- 의존성은 항상 코드와 일치해야 한다.
- 의존성이 마음에 들지 않으면 코드를 수정해야 한다.
- 린터를 억제하면 매우 혼란스러운 버그가 발생하므로 항상 피해야 한다.
- 의존성을 제거하려면 해당 의존성이 필요하지 않다는 것을 린터에게 증명해야 한다.
- 특정 상호작용에 대한 응답으로 일부 코드가 실행되어야 하는 경우 해당 코드를 이벤트 핸들러로 이동해라.
- Effect의 다른 부분이 다른 이유로 다시 실행되어야 하는 경우 여러 개의 Effect로 분할해라.
- 이전 State를 기반으로 일부 State를 업데이트하려면 업데이터 함수를 전달해라.
- "반응"하지 않고 최신 값을 읽으려면 Effect에서 Effect Event를 추출해라.
- 자바스크립트에서 객체와 함수는 서로 다른 시간에 생성된 경우 서로 다른 것으로 간주된다.
- 객체와 함수의 의존성을 피해라. 컴포넌트 외부나 Effect 내부로 이동해라.