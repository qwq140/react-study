# Effect로 동기화하기
렌더링 후 특정 코드를 실행하여 React 외부의 시스템과 컴포넌트를 동기화할 때 사용

## Effect란 무엇이고 이벤트와는 어떻게 다른가?
- 컴포넌트 내부 로직 유형
  - 렌더링 코드
  - 이벤트 핸들러

- Effect는 렌더링 자체에 의해 발생하는 부수 효과를 특정하는 것으로 특정 이벤트가 아닌 특정 렌더링에 의해 발생한다.
- Effect는 커밋이 끝난 후에 화면 업데이트가 이루어지고 나서 실행된다.

## Effect를 작성하는 법
### 1. Effect 선언
- `useEffect` hook을 import
```javascript
import { useEffect } from 'react';
```
- 컴포넌트 최상위 레벨에서 호출하고 Effect 내부에 코드 넣기
```javascript
function MyComponent() {
  useEffect(() => {
    // 이곳의 코드는 *모든* 렌더링 후에 실행됩니다
  });
  return <div />;
}
```
- `useEffect`는 화면에 렌더링이 반영될 때까지 코드 실행을 지연시킨다.(화면을 업데이트한 후 코드 실행)

#### VideoPlayer 예제
- `<VideoPlayer>`라는 React 컴포넌트에서 `isPlaying`을 props로 받아온다.
- `isPlaying`을 통해서 영상을 재생, 일시정지 제어를 한다.
```javascript
function VideoPlayer({ src, isPlaying }) {
  // TODO: isPlaying을 활용하여 무언가 수행하기
  return <video src={src} />;
}
```
- 수동으로 `play()`, `pause()`를 호출해야 제어할 수 있다.
- `isPlaying` prop의 값을 `play()`, `pause()` 같은 호출과 동기화해야 한다.
```javascript
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // 렌더링 중에 이를 호출하는 것이 허용되지 않습니다.
  } else {
    ref.current.pause(); // 역시 이렇게 호출하면 바로 위의 호출과 충돌이 발생합니다.
  }

  return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? '일시정지' : '재생'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}
```
- 렌더링 중에 DOM 노드를 조작하면 안되기 때문에 위의 코드는 에러가 발생한다.
- `useEffect`를 이용해 부수 효과를 렌더링 연산에서 분리한다.
```javascript
import { useEffect, useRef } from 'react';

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref={ref} src={src} loop playsInline />;
}
```
- Effect로 감싼 코드는 화면을 업데이트한 후에 실행된다.

### 2. Effect의 의존성 지정하기
- 기본적으로 Effect는 모든 렌더링 후에 실행된다.

#### Video Player 예제
위의 Video Player예제를 이어서 진행한다.  
```javascript
import { useState, useRef, useEffect } from 'react';

function VideoPlayer({ src, isPlaying }) {
    const ref = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            console.log('video.play() 호출');
            ref.current.play();
        } else {
            console.log('video.pause() 호출');
            ref.current.pause();
        }
    });

    return <video ref={ref} src={src} loop playsInline />;
}

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [text, setText] = useState('');
    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? '일시 정지' : '재생'}
            </button>
            <VideoPlayer
                isPlaying={isPlaying}
                src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            />
        </>
    );
}
```
- 텍스트 입력을 할 수 있게 추가하고 effect 내부에 콘솔로그를 찍어보면
- 텍스트 입력할 때마다 Effect가 다시 실행하는 것을 볼 수 있다.
- Effect를 불필요하게 다시 실행하지 않게 하기 위해서는 `useEffect`호출의 두번째 인자로 의존성 배열을 지정하면된다.
```javascript
  useEffect(() => {
    // ...
  }, []);
```
> React Hook useEffect has a missing dependency: 'isPlaying'. Either include it or remove the dependency array
- 빈 배열을 추가하면 위와 같은 에러가 발생한다.
- Effect 내부코드는 `isPlaying`에 의존하지만 의존성 배열에 선언되어있지 않다.
```javascript
  useEffect(() => {
    if (isPlaying) { // 여기서 사용하니까...
      // ...
    } else {
      // ...
    }
  }, [isPlaying]); // ...여기에 선언되어야겠네!
```
- 의존성 배열로 `[isPlaying]`을 지정하면 렌더링 중에 `isPlaying`이 이전과 동일하면 Effect를 다시 실행하지 않도록 알려준다.

의존성 배열에 따른 effect 동작
```javascript
useEffect(() => {
  // 모든 렌더링 후에 실행됩니다
});

useEffect(() => {
  // 마운트될 때만 실행됩니다 (컴포넌트가 나타날 때)
}, []);

useEffect(() => {
 // 마운트될 때 실행되며, *또한* 렌더링 이후에 a 또는 b 중 하나라도 변경된 경우에도 실행됩니다
}, [a, b]);
```

### 3. 클린업 추가하기 (필요할 때)
컴포넌트 언마운트시에 실행하는 함수 추가
````javascript
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => connection.disconnect();
}, []);
````


## 개발 중 Effect가 두 번 실행되는 경우를 다루는 방법
- React는 개발 중에 컴포넌트를 명시적으로 다시 마운트 한다.
- "Effect를 한 번 실행하는 방법"이 아니라 "어떻게 Effect가 다시 마운트된 후에도 작동하도록 고칠 것인가"라는 것이 옳은 질문
- 일반적으로 정답은 클린업 함수를 구현하는 것
- 기본 원칙은 사용자가 Effect가 한 번 실행되는 것(배포 환경과 같이)과 설정->클린업->설정순서(개발 중에 볼 수 있는 것) 간에 차이를 느끼지 못해야 한다.

## React로 작성되지 않은 위젯 제어하기
### 지도 컴포넌트를 추가한다고 가정
- 지도 컴포넌트에 `setZoomLevel()` 메서드가 있고, `zoomLevel`state 변수와 동기화
```javascript
useEffect(() => {
  const map = mapRef.current;
  map.setZoomLevel(zoomLevel);
}, [zoomLevel]);
```
- 이 경우는 클린업이 필요하지 않다.
- 동일한 값을 가지고 `setZoomLevel`을 두 번 호출하는 것은 문제되지 않는다. 

일부 API는 연속해서 두 번 호출하는 것을 허용하지 않을 수 있다. 
### dialog 제어
- `<dialog>`의 `showModal`메서드는 두 번 호출하면 예외를 발생시킨다.
- 클린업 함수를 구현하고 이 함수에서 대화 상자를 닫도록 한다.
```javascript
useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    return () => dialog.close();
}, []);
```
- 개발 중에는 Effect가 `showModal()`을 호출하고 즉시 `close()`를 호출하고 다시 `showModal()`을 호출한다.

## 이벤트 구독하기
- Effect가 어떤 것을 구독한다면, 클린업 함수에서 구독을 해지해야 한다.
```javascript
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## 애니메이션 트리거
- 클린업 함수에서 애니메이션을 초기 값으로 재설정해야 한다.
```javascript
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // Trigger the animation
  return () => {
    node.style.opacity = 0; // Reset to the initial value
  };
}, []);
```

## 데이터 페칭
- 만약 Effect가 어떤 데이터를 가져온다면, 클린업 함수에서는 fetch를 중단하거나 결과를 무시해야 한다.
```javascript
useEffect(() => {
  let ignore = false;

  async function startFetching() {
    const json = await fetchTodos(userId);
    if (!ignore) {
      setTodos(json);
    }
  }

  startFetching();

  return () => {
    ignore = true;
  };
}, [userId]);
```
- 이미 발생한 네트워크 요청을 실행 취소할 수는 없지만, 클린업 함수는 더 이상 관련이 없는 fetch가 애플리케이션에 계속 영향을 미치지 않도록 보장해야 한다.
- 개발 중에는 네트워크 탭에서 두 개의 fetch가 표시된다.
  - ignore 검사로 인해 state에 영향을 미치지 않는다.
- 프로덕션 환경에서는 하나의 요청만 있을 것이다.
  - 개발 중에 두 번째 요청이 문제라면 캐싱을 하는 것도 좋은 방법이다.
```javascript
function TodoList() {
  const todos = useSomeDataLibrary(`/api/user/${userId}/todos`);
  // ...
```

>### Effect에서 데어터를 가져오는 대안
>#### Effect 안에 fetch를 넣으면 생기는 단점
> - Effect는 서버에서 실행되지 않는다.  
>   클라이언트 컴퓨터는 모든 JavaScript를 다운로드하고 앱을 렌더링해야만 데이터를 로드해야 한다. 이것은 효율적이지 않다.
> - Effect 안에서 직접 가져오면 "네트워크 폭포"를 쉽게 만듬.  
>   부모 렌더링 -> 데이터 fetch -> 자식 렌더링 -> 데이터 fetch  
>   데이터를 병렬로 가져오는 것보다 느림
> - Effect 안에서 직접 가져오는 것은 데이터를 미리 로드하거나 캐시하지 않음음 의미  
>   컴포넌트가 언마운트되고 다시 마운트되면 데이터를 다시 가져온다. 비효율적이다.
> - 그리 편리하지 않다.
>   fetch 호출을 작성할 때 race condition 문제를 해결하기 위해서 비슷한 보일러플레이트 코드를 작성하게 된다.
>#### 권장하는 방식
> - 프레임워크를 사용하는 경우 해당 프레임워크의 내장 데이터 페칭 메커니즘을 사용하라.
> - 클라이언트 측 캐시를 사용하거나 구축하는 것을 고려하라.
>   - React Query, useSWR, React Router 6.4+ 사용
>   - 직접 솔루션 구축
>     - Effect를 내부적으로 사용하면서 요청 중복을 제거하고 응답을 캐시하고 네트워크 폭포를 피하는 로직을 추가

## 분석 보내기
페이지 방문 시 분석 이벤트를 보내는 코드
```javascript
useEffect(() => {
  logVisit(url); // POST 요청을 보냄
}, [url]);
```
개발 환경에서는 `logVisit`가 각 URL에 대해 두 번 호출될 것이다. 이를 수정하고 싶을 수 있지만 **코드를 그대로 유지하는 것을 권장한다.**
한 번 실행하거나 두 번 실행하는 것 사이에서 사용자가 동작 차이를 느낄 수 없기 때문이다.
실제로 개발 환경에서는 `logVisit`가 아무 작업도 수행하지 않아야 한다. 왜냐하면 개발 환경의 로그가 제품 지표를 왜곡시키면 안된다.
컴포넌트는 파일을 저장할 때마다 재마운트되어 개발 환경에서는 추가적인 방문 기록을 로그에 남기게 된다.  

**프로덕션 환경에서는 두 번 일어나지 않는다.**
분석 이벤트를 디버깅하려면 앱을 스테이징 환경에 배포하거나 Strict mode를 잠깐 끄고 해라.

## Effect가 아닌 경우 : 애플리케이션 초기화
일부 로직은 애플리케이션 시작 시에 한 번만 실행되어야 한다. 이러한 로직은 컴포넌트 외부에 배치할 수 있다.
```javascript
if (typeof window !== 'undefined') { // 브라우저에서 실행 중인지 확인합니다.
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```
해당 로직은 브라우저가 페이지를 로드한 후 한 번만 실행된다.

## Effect가 아닌 경우 : 제품 구입하기
가끔 클린업 함수를 작성하더라도 Effect가 두 번 실행되는 것에 대해 사용자가 확인할 수 있는 결과를 방지할 방법이 없을 수 있다.
예를 들어, 제품을 구매하는 POST 요청을 보내는 Effect가 있다고 가정하면
```javascript
useEffect(() => {
  // 잘못된 방법: 이 Effect는 개발 환경에서 두 번 실행되며 코드에 문제가 드러납니다.
  fetch('/api/buy', { method: 'POST' });
}, []);
```
제품을 두 번 구매하고 싶지 않을 것이다. 이것은 이런 로직을 Effect에 넣지 않아야 하는 이유다.
사용자가 다른 페이지에 갔다가 뒤로 가기를 한다면 Effect가 실행되고 또 구매할 것이다. 
이런 코드는 방문할 때 실행되면 안되며 버튼을 클릭하여 구매하게 해야한다.
```javascript
  function handleClick() {
    // 구매는 특정 상호 작용에 의해 발생하는 이벤트입니다.
    fetch('/api/buy', { method: 'POST' });
  }
```

## 각각의 렌더링은 각각의 고유한 Effect를 갖는다.
```javascript
export default function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h1>Welcome to {roomId}!</h1>;
}
```
### 초기 렌더링
사용자가 `<ChatRoom roomId="general" />`을 방문을 한다.
```javascript
  // 첫 번째 렌더링에 대한 JSX (roomId = "general")
  return <h1>Welcome to general!</h1>;
```
**Effect 또한 렌더링 결과물의 일부이다.** 첫 번째 렌더링의 Effect는 다음과 같다.
```javascript
 // 첫 번째 렌더링에 대한 이펙트 (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // 첫 번째 렌더링의 의존성 (roomId = "general")
  ['general']
```
React는 Effect를 실행하며, `'general'` 채팅방에 연결한다.

### 같은 의존성 사이에서의 재랜더링
`<ChatRoom roomId="general" />`가 다시 렌더링된다고 가정한다.
```javascript
  // 두 번째 렌더링에 대한 JSX (roomId = "general")
  return <h1>Welcome to general!</h1>;
```
React는 렌더링 출력이 변경되지 않았기 때문에 DOM을 업데이트하지 않는다. 두 번째 렌더링의 Effect는 다음과 같다.
```javascript
  // 두 번째 렌더링에 대한 Effect (roomId = "general")
  () => {
    const connection = createConnection('general');
    connection.connect();
    return () => connection.disconnect();
  },
  // 두 번째 렌더링에 대한 의존성 (roomId = "general")
  ['general']
```
React는 두 번째 렌더링에서의 `['general']`를 첫 번째 렌더링에서의 `['general']`와 비교한다.
**모든 의존성은 동일하므로 React는 두 번째 렌더링에서의 Effect를 무시한다.** 해당 Effect는 호출되지 않는다.

### 다른 의존성으로 재렌더링
사용자가 `<ChatRoom roomId="travel" />`을 탐색한다.
```javascript
  // 세 번째 렌더링에 대한 JSX (roomId = "travel")
  return <h1>Welcome to travel!</h1>;
```
다른 JSX를 반환하기 때문에 React는 DOM을 업데이트한다. 세 번째 렌더링에서의 Effect는 다음과 같다.
```javascript
  // 세 번째 렌더링에 대한 Effect (roomId = "travel")
  () => {
    const connection = createConnection('travel');
    connection.connect();
    return () => connection.disconnect();
  },
  // 세 번째 렌더링에 대한 의존성 (roomId = "travel")
  ['travel']
```
React는 세 번째 렌더링에서의 `['travel']`와 두 번째 렌더링에서의 `['general']`를 비교한다. 의존성이 다르다.
`Object.is('travel', 'general')`은 false이므로 Effect는 패스할 수 없다.  
**React는 세 번째 렌더링의 Effect를 적용하기 전에 먼저 실행된 Effect를 정리해야 한다.**
두 번째 렌더링의 Effect가 건너뛰어졌기 때문에, React는 첫 번째 렌더링의 Effect를 정리해야 한다.
`createConnection('general')`로 생성된 연결은 `disconnect()`를 호출하여 `'general'`채팅방과 연결이 해제된다.

그 후 React는 세 번째 렌더링의 Effect를 실행하여 `'travel'`채팅방에 연결한다.

### 언마운트
사용자가 다른 페이지로 이동하게 되어 `ChatRoom`컴포넌트가 언마운트된다. 
React는 마지막 Effect의 클린업 함수를 실행한다. 마지막 Effect는 세 번째 렌더링에서 온 것이다. 
세 번째 렌더링의 클린업은 `createConnection('travel')` 연결을 종료하여 앱은 `'travel'` 채팅방과의 연결을 해제하게 된다.

### 개발 환경에서만의 동작
Strict Mode가 활성화된 경우, React는 모든 컴포넌트를 한 번 마운트한 후에 다시 마운트한다. 
이는 클린업이 필요한 Effect를 찾는 데 도움이 되고 race condition과 같은 버그를 초기에 찾을 수 있다. 
게다가 React는 개발 중 파일을 저장할 때마다 Effect를 다시 마운트한다.