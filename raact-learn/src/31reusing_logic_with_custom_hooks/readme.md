# 커스텀 Hook으로 로직 재사용하기

## 커스텀 Hook : 컴포넌트간 로직 공유하기
네트워크에 크게 의존하는 앱을 개발 중이라고 가정한다. 
유저가 앱을 사용하는 동안 네트워크가 갑자기 사라질 때, 유저에게 경고하고 싶을 것이다.
이 경우 컴포넌트에는 다음 두 가지가 필요할 것이다.
1. 네트워크가 온라인 상태인지 아닌지 추적하는 하나의 state
2. 전역 `online(온라인)`, `offline(오프라인)` 이벤트를 구독하고, 이에 맞춰 state를 업데이트하는 Effect

두 가지 요소는 컴포넌트가 네트워크 상태와 동기화 되도록 한다.
```javascript
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}
```

다른 컴포넌트에서 같은 로직을 또 사용한다고 가정한다. 
네트워크가 꺼졌을 때, "저장" 대신 "재연결 중..."을 보여주는 비활성화된 저장 버튼을 구현한다고 가정
```javascript
import { useState, useEffect } from 'react';

export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  );
}
```
두 컴포넌트가 다른 시각적 모양을 갖고 있다고해도, 둘 사이의 중복되는 로직을 재사용하길 원한다.

### 컴포넌트로부터 커스텀 Hook 추철하기
`useState`그리고 `useEffect`와 비슷한 내장된 `useOnlineStatus` Hook이 있다면 두 컴포넌트를 단순화할 수 있고, 중복을 제거할 수 있다.
```javascript
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  );
}
```
`useOnlineStatus` 함수를 정의한다.
```javascript
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}
```
함수가 `isOnline`을 반환하면, 컴포넌트가 그 값을 읽을 수 있게 된다.

**중요한 건, 두 컴포넌트 내부 코드가 어떻게 그것을 하는지(브라우저 이벤트 구독)보다 그들이 무엇을 하려는지(온라인 state 사용하기)에 대해 설명하고 있다는 점이다.**  

커스텀 Hook을 만들어 낼 때, 브라우저 API나 외부 시스템과 소통하는 방법과 같은 불필요한 세부 사항을 숨길 수 있다.
컴포넌트의 코드는 목적만을 나타내고 실행 방법에 대해선 나타내지 않는다.

### Hook의 이름은 항상 `use`로 시작해야 한다.
커스텀 Hook을 만들때 다음의 작명 규칙을 준수해야 한다.
1. React컴포넌트의 이름은 항상 대문자로 시작해야 한다.
2. Hook의 이름은 `use`뒤에 대문자로 시작해야 한다.

이런 규칙들은 컴포넌트를 볼 때, 어디에 state, Effect 및 다른 React 기능들이 "숨어"있는지 알 수 있다.

### 커스텀 Hook은 state 그 자체를 공유하는게 아닌 state 저장 로직을 공유하도록 한다.
```javascript
import { useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('Mary');
  const [lastName, setLastName] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <>
      <label>
        First name:
        <input value={firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name:
        <input value={lastName} onChange={handleLastNameChange} />
      </label>
      <p><b>Good morning, {firstName} {lastName}.</b></p>
    </>
  );
}
```
각각의 폼 입력에 반본되는 로직이 있다.
1. state가 존재한다.(`firstName`, `lastName`)
2. 변화를 다루는 함수가 존재한다.(`handleFirstNameChange`, `handleLastNameChange`)
3. 해당 입력에 대한 `value`와 `onChange`의 속성을 지정하는 JSX가 존재한다.

`useFormInput` 커스텀 Hook을 통해 반복되는 로직을 추출할 수 있다.

[커스텀 Hook통해 리팩토링된 코드](./2_example)  
- `useFormInput`에서 `value`라고 불리는 state 변수는 한번만 정의되었다.
- `Form`컴포넌트는 `useFormInput`을 두 번 호출한다.

**커스텀 Hook은 우리가 state 그 자체가 아닌 state 저장 로직을 공유하도록 해준다. 같은 Hook을 호출하더라도 각각의 Hook 호출은 오나전히 독립되어 있다.**

## Hook 사이에 상호작용하는 값 전달하기
커스텀 Hook 안의 코드는 컴포넌트가 리렌더링될 때마다 다시 돌아간다.
이게 바로 커스텀 Hook이 순수해야하는 이유이다.  

[예제 코드](./3_example)  
`serverUrl`, `roomId`를 변경할 때, Effect는 변화에 "반응"하며 재동기화된다.

채팅서버 연결하는 Effect 코드를 커스텀 Hook `useChatRoom`으로 추출한다.
```javascript
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
```
`ChatRoom`가 리렌더링될 때마다, Hook에 최신 `roomId`와 `serverUrl`값을 넘겨준다. 
이게 바로 리렌더링 이후에 값이 달라지는지 여부에 관계없이 Effect가 재연결하는 이유이다.

### 커스텀 Hook에 이벤트 핸들러 넘겨주기
만약 `useChatRoom`을 더 많은 컴포넌트에서 사용하길 원한다면, 컴포넌트가 본인의 동작을 커스텀할 수 있길 바랄 것이다.
예를 들어, 최근 메시지가 도착했을 때 무엇을 해야 하는지에 대한 로직이 Hook안에 하드코딩 되어있다고 가정한다.
```javascript
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    //...
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg);
    });
    //...
}
```
이 로직을 컴포넌트에 되돌려 놓고 싶다고 할 때
```javascript
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });
  // ...
```
이게 동작하게 하기 위해, 커스텀 Hook을 정의된 옵션 중 하나인 `onReceiveMessage`를 갖도록 한다.
```javascript
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onReceiveMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl, onReceiveMessage]); // ✅ 모든 의존성이 정의됨.
}
```
이대로도 동작하지만, 커스텀 Hook이 이벤트 핸들러를 허용할 때 더 개선할 부분이 있다.

컴포넌트가 리렌더링될 때마다 채팅방을 재연결하는 원인이 되기 때문에, 
의존성에 `onReveiveMessage`를 추가하는 것은 이상적이지 않다.
이 이벤트 핸들러를 의존성에서 제거하기 위해 Effect Event로 추출한다.

```javascript
import { useEffect, useEffectEvent } from 'react';
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 모든 의존성이 정의됨.
}
```
`ChatRoom`가 리렌더링될 때마다 채팅방이 재연결되지 않는다.

## 언제 커스텀 Hook을 사용해야 하는가
```javascript
function ShippingForm({ country }) {
  const [cities, setCities] = useState(null);
  // 이 Effect는 나라별 도시를 불러옵니다.
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
  }, [country]);

  const [city, setCity] = useState(null);
  const [areas, setAreas] = useState(null);
  // 이 Effect 선택된 도시의 구역을 불러옵니다.
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
  }, [city]);

  // ...
```
이 코드들이 반복됨에도 불구하고, Effect들을 따로 분리하는 것이 옳다.
하나의 Effect로 통합시킬 필요가 없는 대신 `ShippingForm`컴포넌트를 `useData`라는 커스텀 Hook을 통해 공통된 로직을 추출할 수 있다.
```javascript
function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then(response => response.json())
        .then(json => {
          if (!ignore) {
            setData(json);
          }
        });
      return () => {
        ignore = true;
      };
    }
  }, [url]);
  return data;
}
```
이제 `ShippingForm` 컴포넌트 내부의 Effect들을 `useData`로 교체할 수 있다.
```javascript
function ShippingForm({ country }) {
  const cities = useData(`/api/cities?country=${country}`);
  const [city, setCity] = useState(null);
  const areas = useData(city ? `/api/areas?city=${city}` : null);
  // ...
```
커스텀 Hook을 추출하는 것은 데이터의 흐름을 명확하게 해준다.
`url`을 입력하고 `data`를 받는다. `useData`안의 Effect를 숨김으로써 다른 사람이 `ShippingForm`컴포넌트에 불필요한 의존성을 추가하는 것을 막을 수 있다.

### 커스텀 Hook은 더 나은 패턴으로 변경할 수 있도록 도와준다.
Effect는 React에서 벗어나는 것이 필요할 때나 사용 시에 괜찮은 내장된 해결 방법이 없는 경우 사용한다.
React팀의 목표는 더 구체적인 문제에 더 구체적인 해결 방법을 제공해 앱에 있는 Effect의 숫자를 점차 최소한으로 줄이는 것이다.
커스텀 Hook으로 Effect를 감싸는 것은 이런 해결 방법들이 가능해질 때 코드를 쉽게 업그레이드할 수 있게 해준다.

[예시 코드](./4_example)
해당 예시에서 `useOnlineStatus`는 한 쌍의 `useState`와 `useEffect`와 함께 실행된다. 
이 방법은 예외 상황들이 존재한다. 예를 들어, 컴포넌트가 마운트됐을 때, `isOnline`이 이미 `true`라고 가정한다.
하지만 이것은 네트워크가 이미 꺼졌을 때 틀린 가정이 된다.
이런 상황을 확인하기 위해 브라우저 `navigator.onLine` API를 사용할 수도 있다. 
하지만 이걸 직접적으로 사용하게 되면 초기 HTML을 생성하기 위한 서버에선 동작하지 않는다.

React 18은 `useSyncExternalStore`API를 제공한다.
```javascript
import { useSyncExternalStore } from 'react';

function subscribe(callback) {
    window.addEventListener('online', callback);
    window.addEventListener('offline', callback);
    return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
    };
}

export function useOnlineStatus() {
    return useSyncExternalStore(
        subscribe,
        () => navigator.onLine, // 클라이언트의 값을 받아오는 방법
        () => true // 서버의 값을 받아오는 방법
    );
}
```
새로운 기능으로 변경을 해도 다른 컴포넌트들을 변경할 필요가 없다.
```javascript
function StatusBar() {
  const isOnline = useOnlineStatus();
  // ...
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  // ...
}
```

커스텀 Hook으로 Effect를 감싸는 것이 종종 유용한 이유
1. 매우 명확하게 Effect로 주고받는 데이터 흐름을 만들 때
2. 컴포넌트가 Effect의 정확한 실행보다 목적에 집중하도록 할 때
3. React가 새 기능을 추가할 때, 다른 컴포넌트의 변경 없이 이 Effect를 삭제할 수 있을 때

## 요약
- 커스텀 Hook을 사용하면 컴포넌트 간 로직을 공유할 수 있다.
- 커스텀 Hook의 이름은 `use`뒤에 대문자로 시작되어야 한다.
- 커스텀 Hook은 state 자체가 아닌 state 저장 로직만 공유한다.
- 하나의 Hook에서 다른 Hook으로 반응형 값을 전달할 수 있고, 값은 최신 상태로 유지된다.
- 모든 Hook은 컴포넌트가 재렌더링될 때 마다 재실행된다.
- 커스텀 Hook의 코드는 컴포넌트 코드처럼 순수해야 한다.
- 커스텀 Hook을 통해 받는 이벤트 핸들러는 Effect로 감싸야 한다.
- `useMount`같은 커스텀 Hook을 생성하면 안 된다. 용도를 명확히 해야한다.