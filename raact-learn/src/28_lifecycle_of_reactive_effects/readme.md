# 반응형 effects의 생명주기
## effect의 생명주기
React 컴포넌트의 생명주기
- 컴포넌트는 화면에 추가될 때 마운트 된다.
- 일반적으로 상호작용에 대한 응답으로 새로운 props나 state를 수신하면 업데이트 된다.
- 컴포넌트가 화면에서 제거되면 마운트가 해제 된다.

effect는 외부 시스템을 현재 props 및 state와 동기화하는 방법을 설명한다.

```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
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

effect의 본문에는 동기화 시작 방법이 명시되어 있다.
```javascript
    // ...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    // ...
```

effect에서 반환되는 cleanup function는 동기화를 중지하는 방법을 지정한다.
```javascript
    // ...
    return () => {
      connection.disconnect();
    };
    // ...
```
직관적으로 React는 컴포넌트가 마운트될 때 동기화를 시작하고 컴포넌트가 마운트 해제될 때 동기화를 중지할 것이라고 생각할 수 있다.
때로는 컴포넌트가 마운트된 상태에서 동기화를 여러 번 시작하고 중지해야 할 수도 있다.

### 동기화가 두 번 이상 수행되어야 하는 이유
`ChatRoom` 컴포넌트가 사용자가 드롭다운에서 선택한 `roomId` prop을 받는닥고 가정한다.
처음에 사용자가 `"general"`대화방을 `roomId`로 선택했다고 가정한다.
앱에 `"general"`채팅방이 표시된다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId /* "general" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```
UI가 표시되면 React가 effect를 실행하여 동기화를 시작한다.
`"general"`방에 연결된다.
```javascript
function ChatRoom({ roomId /* "general" */ }) {
    useEffect(() => {
        const connection = createConnection(serverUrl, roomId); // "general" 방에 연결
        connection.connect();
        return () => {
            connection.disconnect(); // "general" 방에서 연결 해제
        };
    }, [roomId]);
  // ...
```
사용자가 드롭다운에서 다른 방(`"travel"`)을 선택한다.
먼저 React가 UI를 업데이트 한다.
```javascript
function ChatRoom({ roomId /* "travel" */ }) {
  // ...
  return <h1>Welcome to the {roomId} room!</h1>;
}
```
`roomId`prop이 변경되었기 때문에 그때 effect가 수행한 작업(`"general"`방에 연결)이 더 이상 UI와 일치하지 않는다.

이 시점에 React가 두 가지 작업을 수행하기를 원한다.
1. 이전 roomId와의 동기화를 중지한다.(`"general"`방에서 연결 끊기)
2. 새 roomId와 동기화 시작(`"travel"`방에 연결)

### React가 effect를 재동기화하는 방법
`ChatRoom`컴포넌트가 `roomId`prop에 새로운 값을 받았다.
다른 방에 다시 연결하려면 React가 effect를 다시 동기화해야 한다.

동기화를 중지하기 위해 React는 `"general"`방에 연결한 후 effect가 반환한 클린업 함수를 호출한다.
클린업 함수는 `"general"`방에서 연결을 끊는다.
```javascript
    // ...
    return () => {
      connection.disconnect(); // "general" 방에서 연결 해제
    };
    // ...
```
effect를 실행한다. 이번에는 `roomId`가 `"travel"`이므로 `"travel"`채팅방과 동기화를 시작한다.
```javascript
function ChatRoom({ roomId /* "travel" */ }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // "travel" 방에 연결
    connection.connect();
    // ...
```
마지막으로 사용자가 다른 화면으로 이동하면 `ChatRoom`이 마운트를 해제한다. 
React는 마지막 effect 동기화를 중지하고 채팅방에서 연결을 끊는다.

### effect의 관점에서 생각하기
`ChatRoom`컴포넌트의 관점에서 일어난 일
1. `roomId`가 `"general"`으로 설정되어 마운트된 `ChatRoom`
2. `roomId`가 `"travel"`으로 설정되어 업데이트된 `ChatRoom`
3. 마운트 해제된 `ChatRoom`

컴포넌트 생명주기에서 이러한 각 시점에서 effect는 다른 작업을 수행했다.
1. effect가 `"general"`대화방에 연결
2. `"general"`방에서 연결이 끊어지고 `"travel"`방에 연결된 effect
3. `"travel"`방에서 연결이 끊어진 effect

```javascript
  useEffect(() => {
    // roomId로 지정된 방에 연결된 effect...
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      // ...연결이 끊어질 때까지
      connection.disconnect();
    };
  }, [roomId]);
```
이 코드의 구조는 어떤 일이 일어났는지 겹치지 않는 시간의 연속으로 보는 데 영감을 줄 수 있다.
1. `"general"`방에 연결된 effect(연결이 끊어질 때까지)
2. `"travel"`방에 연결된 effect(연결이 끊어질 때까지)

컴포넌트의 관점에서 보면 effect를 '렌더링 후'또는 '마운트 해제전'과 같은 특정 시점에 실행되는 '콜백' 또는 '생명주기 이벤트'로 생각하기 쉬웠다.
이러한 사고방식은 매우 빠르게 복잡해지므로 피하는 것이 좋다.

**항상 한 번에 하나의 시작/중지 사이클에만 집중하라.
컴포넌트를 마운트, 업데이트 또는 마운트 해제하는 것은 중요하지 않다.
동기화를 시작하는 방법과 중지하는 방법만 설명하면 된다.
이 작업을 수행하면 필요한 횟수만큼 effect를 시작하고 중지할 수 있는 탄력성을 확보할 수 있다.**

### React가 effect를 다시 동기화될 수 있는지 확인하는 방법
[예시코드](./example) 해당 코드는 "Open chat" 버튼을 클릭하여 `ChatRoom`컴포넌트를 마운트한다.

컴포넌트가 처음 마운트될 때 3개의 로그가 표시된다.
1. `✅ https://localhost:1234... 에서 "general" 방에 연결 중입니다.`(개발 전용)
2. `❌ https://localhost:1234에서 "일반" 방에서 연결 해제되었습니다.` (개발 전용)
3. `✅ https://localhost:1234... 에서 "general" 방에 연결 중입니다.`

처음 두 개의 로그는 개발 전용이다. 개발 시 React는 항상 각 컴포넌트를 한 번씩 다시 마운트한다.

**React는 개발 단계에서 즉시 강제로 동기화를 수행하여 effect가 다시 동기화할 수 있는지 확인한다.**

### React가 effect를 다시 동기화해야 한다는 것을 인식하는 방법
종속성 목록에 `roomId`를 포함함으로써 해당 코드가 `roomId`에 종속되어 있다고 React에 알렸기 때문에 effect를 다시 동기화해야 한다는 것을 React가 알게된다.
```javascript
function ChatRoom({ roomId }) { // roomId prop은 시간이 지남에 따라 변경될 수 있습니다.
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // 이 effect는 roomId를 읽습니다.
    connection.connect();
    return () => {
      connection.disconnect();
    };
    
  }, [roomId]); // 따라서 React에 이 effect가 roomId에 "의존"한다고 알려줍니다.
  // ...
```
1. `roomId`가 `prop`이므로 시간이 지남에 따라 변경될 수 있다는 것을 알고 있다.
2. effect가 `roomId`를 읽는다는 것을 알게됨
3. `roomId`를 effect의 종속성으로 지정

컴포넌트가 다시 렌더링 될 때마다 React는 전달한 의존성 배열을 살펴본다.
배열의 값 중 하나라도 이전 렌더링의 값이 다르면 React는 effect를 다시 동기화한다.

### 각 effect는 별도의 동기화 프로세스를 나타낸다.
```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  // ...
}
```
방문을 기록하는 것과 채팅방 연결하는 것은 별개의 프로세스이다. 두 개의 개별 effect로 작성해야한다.
```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    logVisit(roomId);
  }, [roomId]);

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    // ...
  }, [roomId]);
  // ...
}
```
**코드의 각 effect는 별도의 독립적인 동기화 프로세스를 나타내야 한다.**

## 반응형 값에 "반응"하는 effect
effect에서 두 개의 변수를 읽지만 종속성으로 `roomId`만 지정했다.
```javascript
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
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
`serverUrl`이 종속성이 될 필요가 없는 이유  
- 리 렌더링으로 인해 `serverUrl`이 변경되지 않기 때문
- `roomId`는 다시 렌더링할 때 달라질 수 있다.
  - 컴포넌트에서 props, state 및 기타값은 렌더링 중에 계산되고 React 데이터 흐름에 참여하기 때문에 반응형이다.

만약 `serverUrl`이 state 변수라면 반응형이기 때문에 종속성에 포함되어야 한다.

### 빈 종속성이 있는 effect의 의미
`serverUrl`과 `roomId`를 모두 컴포넌트 외부로 이동하면 어떻게 되는가?
```javascript
const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, []); // ✅ 선언된 모든 종속성
  // ...
}
```
effect의 코드는 어떤 반응형 값도 사용하지 않으므로 종속성이 비어 있을 수 있다.  

컴포넌트 관점
- 컴포넌트 마운트될 때만 채팅방에 연결
- 컴포넌트가 마운트 해제될 때만 연결 해제

effect의 관점
- 마운트 및 마운트 해제에 대해 생각할 필요가 없다.
- effect가 동기화를 시작하고 중지하는 작업을 지정한 것이 중요
- `roomId` 또는 `serverUrl`이 반응형이 되는 경우 effect의 코드는 변경되지 않고 종속성에 추가하기만 하면 된다.

### 컴포넌트 본문에서 선언된 모든 변수는 반응형이다.
effect에서 사용하는 컴포넌트 본문의 모든 변수는 effect 종속성 목록에 있어야 한다.

설정에서 기본 서버를 구성할 수도 있다고 가정  
이미 settings state를 context에 넣어서 해당 context에서 `settings`를 읽었다고 가정  
props에서 선택한 서버와 기본 서버를 기준으로 `serverUrl`을 계산
```javascript
function ChatRoom({ roomId, selectedServerUrl }) { // roomId는 반응형입니다.
  const settings = useContext(SettingsContext); // settings는 반응형입니다.
  const serverUrl = selectedServerUrl ?? settings.defaultServerUrl; // serverUrl는 반응형입니다.
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId); // effect는 roomId 와 serverUrl를 읽습니다.
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [roomId, serverUrl]); // 따라서 둘 중 하나가 변경되면 다시 동기화해야 합니다!
  // ...
}
```
`serverUrl`은 렌더링 중에 계산되므로 리 렌더링으로 인해 변경될 수 있어 반응형이다.

**컴포넌트 내부의 모든 값은 반응형이다. 
모든 반응형 값은 리 렌더링할 때 변경될 수 있으므로 반응형 값을 effect의 종속 요소로 포함해야 한다.**

### React는 모든 반응형 값을 종속성으로 지정했는지 확인한다.
린터가 React에 대해 구성된 경우, effefct의 코드에서 사용되는 모든 반응형 값이 종속성으로 선언되었는지 확인한다.
```javascript
function ChatRoom({ roomId }) { // roomId는 반응형입니다.
  const [serverUrl, setServerUrl] = useState('https://localhost:1234'); // serverUrl는 반응형입니다.

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, []); // <-- 여기 무언가 잘못되었습니다!
  // ...
```
`roomId`, `serverUrl`이 모두 반응형이기 때문에 린트 오류이다.
> 11:6 - React Hook useEffect has missing dependencies: 'roomId' and 'serverUrl'. Either include them or remove the dependency array.

## 요약
- 컴포넌트는 마운트, 업데이트, 마운트 해제할 수 있다.
- 각 effect는 주변 컴포넌트와 별도의 라이프사이클을 가진다.
- 각 effect는 시작 및 중지할 수 있는 별도의 동기화 프로세스를 설명한다.
- effect를 작성하고 읽을 때는 컴포넌트의 관점(마운트, 업데이트 또는 마운트 해제 방법)이 아닌 개별 effect의 관점(동기화 시작 및 중지 방법)에서 생각해라.
- 컴포넌트 본문 내부에 선언된 값은 "반응형"이다.
- 반응형 값은 시간이 지남에 따라 변경될 수 있으므로 effect를 다시 동기화해야 한다.
- 린터는 effect 내부에서 사용된 모든 반응형 값이 종속성으로 지정되었는지 확인한다.
- 린터에 의해 플래그가 지정된 모든 오류는 합법적인 오류이다. 규칙을 위반하지 않도록 코드를 수정할 방법은 있다.

