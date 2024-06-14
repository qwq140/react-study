# Effect가 필요하지 않은 경우
외부 시스템이 관여하지 않는 경우 Effect가 필요하지 않는다. 불필요한 Effect를 제거하면 코드를 더 쉽게 따라갈 수 있고, 실행 속도가 빨라지며, 에러 발생 가능성이 줄어든다.
## 불필요한 Effect를 제거하는 방법
Effect가 필요하지 않은 두 가지 경우
- 렌더링을 위해 데이터를 변환하는 데 Effect가 필요하지 않는다.
- 사용자 이벤트를 핸들링하는 데 Effect가 필요하지 않는다.

### props 또는 state에 따라 state 업데이트하기
다음과 같이 두 개의 state 변수가 있다.
```javascript
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
```

`firstName`이나 `lastName`을 바탕으로 `fullName`을 얻고 싶은 상황이다. 
`fullName`을 state 변수로 선언하고 `effect`를 활용해 다음과 같이 업데이트 할 수 있다.
```javascript
  // Bad : 불필요한 상태와 불필요한 effect
  const [fullName, setFullName] = useState('');
  useEffect(() => {
    setFullName(firstName + ' ' + lastName);
  }, [firstName, lastName]);
```
위의 코드는 `firstName`과 `lastName`의 상태가 업데이트될 때 렌더링되고, useEffect의 코드로 인해 다시 렌더링하기 때문에 비효율적이다.

이 경우 `fullName`과 `lastName`으로 직접 계산하는 방식이 좋다.
```javascript
function Form() {
  const [firstName, setFirstName] = useState('Taylor');
  const [lastName, setLastName] = useState('Swift');
  // ✅ Good: 렌더링 중에 계산됨
  const fullName = firstName + ' ' + lastName;
  // ...
}
```
리엑트에서는 props나 state에서 계산할 수 있는 것이면 state에 넣지말라고 권장한다.

### 비용이 많이 드는 계산 캐싱하기
이 컴포넌트는 props로 받은 `todos`를 `filter` prop에 따라 필터링하여 `visibleTodos`를 계산한다.
```javascript
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');

  // 🔴 피하세요: 중복된 state 및 불필요한 효과
  const [visibleTodos, setVisibleTodos] = useState([]);
  useEffect(() => {
    setVisibleTodos(getFilteredTodos(todos, filter));
  }, [todos, filter]);

  // ...
}
```
위 코드는 state와 effect가 불필요하고 비효율적이다.
```javascript
function TodoList({ todos, filter }) {
  const [newTodo, setNewTodo] = useState('');
  // ✅ getFilteredTodos()가 느리지 않다면 괜찮습니다.
  const visibleTodos = getFilteredTodos(todos, filter);
  // ...
}
```
`getFilteredTodos`함수는 이 함수와 직접적인 관련이 없는 `newTodo`state 변수가 업데이트되어 렌더링될 때도 실행된다. 
이 경우 실행하고 싶지 않을 수 있는데 `useMemo` Hook으로 캐시할 수 있다.

```javascript
// todos나 filter가 변경되지 ㅇ낳는 한 getFilteredTodos()를 다시 실행하지 않는다.
const visibleTodos = useMemo(() => getFilteredTodos(todos, filter), [todos, filter]);
```
이렇게 하면 `todos`나 `filter`가 변경되지 않는 한 내부 함수가 다시 실행되지 않기를 원한다는 것을 React에게 알린다.

### prop이 변경될 때 일부 state 조정하기
prop이 변경될 때 일부 state만 재설정하거나 조정하고 싶을 때가 있다.  

`item`목록을 prop으로 받고 `selection` state 변수에 선택된 item을 유지한다. `items` prop이 다른 배열을 받을 때마다 `selection`을 `null`로 재설정하고 싶은 경우가 있다.
```javascript
function List({ items }) {
    const [isReverse, setIsReverse] = useState(false);
    const [selection, setSelection] = useState(null);

    // 🔴 피하세요: Effect에서 prop 변경 시 state 조정하기
    useEffect(() => {
        setSelection(null);
    }, [items]);
    // ...
}
```
items가 변경될 때마다 컴포넌트는 처음에는 이전 `selection`값으로 렌더링된다. 그 후 React는 DOM을 업데이트하고 Effect를 실행한다. 
마지막으로 `selection(null)`호출은 다시 렌더링을 한다.

Effect를 삭제하고 렌더링 중에 직접 state를 조정하라.
```javascript
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 더 좋습니다: 렌더링 중 state 조정
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  }
  // ...
}
```
이전 렌더링의 상태를 저장하는 패턴이 이해되지 않을 수 있지만, effect를 통해 상태를 업데이트하는 것보다 낫다.

위 코드에서 `setSelection`은 렌더링 도중에 호출되어 `List`의 `return`문이 끝나면 즉시 리렌더링한다. 
React는 아직 `List`자식을 렌더링 하거나 DOM을 업데이트하지 않았기 때문에 오래된 `selection`값의 렌더링을 건너뛸 수 있다.

이 패턴이 Effect보다 더 호율적이지만 대부분의 컴포넌트에는 이 패턴이 필요하지 않는다.
어떻게 하든 props나 다른 state에 따라 state를 조정하면 데이터 흐름을 이해하고 디버깅하기가 어려워진다.
대신 **key를 사용하여 모든 state를 초기화**하거나 **렌더링 중에 모든 state를 계산**할 수 있는지 확인해라.
```javascript
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ 최고예요: 렌더링 중에 모든 것을 계산
  const selection = items.find(item => item.id === selectedId) ?? null;
  // ...
}
```
이제 state를 조정할 필요가 없다. 선택한 ID를 가진 item이 목록에 있으면 선택된 state로 유지된다.
그렇지 않은 경우 일치하는 item을 찾을 수 없으므로 렌더링 중에 계산된 `selection`은 `null`이 된다. 
이 동작은 다르지만 대부분의 `item`변경이 selection을 보존하므로 더 나은 방법이라고 할 수 있다.

### 이벤트 핸들러 간 로직 공유
제품을 구매할 수 있는 두 개의 버튼(구매 및 결제)이 있는 제품 페이지가 있다고 가정해보자.  

사용자가 제품을 장바구니에 넣을 때마다 알림을 표시하고 싶다.
두 버튼의 클릭 핸들러에서 모두 `showNotification()`을 호출하는 것은 반복적으로 느껴지므로 이 로직을 Effect에 배치하고 싶을 수 있다.
```javascript
function ProductPage({ product, addToCart }) {
  // 🔴 피하세요: Effect 내부의 이벤트별 로직
  useEffect(() => {
    if (product.isInCart) {
      showNotification(`Added ${product.name} to the shopping cart!`);
    }
  }, [product]);

  function handleBuyClick() {
    addToCart(product);
  }

  function handleCheckoutClick() {
    addToCart(product);
    navigateTo('/checkout');
  }
  // ...
}
```
이 Effect는 불필요하고 버그를 유발할 가능성이 높다.

만약 앱이 장바구니를 기억한다면, 카트에 제품을 추가하고 페이지를 새로 고칠 때마다 알림이 계속 표시된다.

어떤 코드가 Effect에 있어야 하는지 이벤트 핸들러에 있어야 하는지 확실하지 않은 경우 이코드가 실행되어야 하는 이유를 생각해봐라.
컴포넌트가 사용자에게 표시되었기 때문에 실행되어야 하는 코드에만 Effect를 사용해라.

위 예제에서는 페이지가 표시되었기 때문이 아니라 사용자가 버튼을 눌렀기 때문에 알림이 표시되어야 하므로 effect를 사용할 필요가 없다.

```javascript
function ProductPage({ product, addToCart }) {
  // ✅ 좋습니다: 이벤트 핸들러에서 이벤트별 로직이 호출됩니다.
  function buyProduct() {
    addToCart(product);
    showNotification(`Added ${product.name} to the shopping cart!`);
  }

  function handleBuyClick() {
    buyProduct();
  }

  function handleCheckoutClick() {
    buyProduct();
    navigateTo('/checkout');
  }
  // ...
}
```

### POST 요청 보내기
이 `Form`컴포넌트는 두 가지 종류의 POST 요청을 전송한다.
1. 마운트 시 analytics 이벤트 요청
2. submit 버튼을 클릭 시 `/api/register`엔드포인트로 POST요청
```javascript
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 좋습니다: 컴포넌트가 표시되었으므로 이 로직이 실행되어야 합니다.
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  // 🔴 피하세요: Effect 내부의 이벤트별 로직
  const [jsonToSubmit, setJsonToSubmit] = useState(null);
  useEffect(() => {
    if (jsonToSubmit !== null) {
      post('/api/register', jsonToSubmit);
    }
  }, [jsonToSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setJsonToSubmit({ firstName, lastName });
  }
  // ...
}
```
analytics POST 요청은 Effect에 남아 있어야 한다. analytics 이벤트를 전송하는 이유는 폼이 표시되었기 때문이다.

`/api/register` POST 요청은 사용자가 버튼을 누를 때 요청을 보낸다. effect를 삭제 하고 이벤트 핸들러로 요청을 하면된다.
```javascript
function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // ✅ 좋습니다: 컴포넌트가 표시되었으므로 이 로직이 실행됩니다.
  useEffect(() => {
    post('/analytics/event', { eventName: 'visit_form' });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // ✅ 좋습니다: 이벤트별 로직은 이벤트 핸들러에 있습니다.
    post('/api/register', { firstName, lastName });
  }
  // ...
}
```
어떤 로직을 이벤트 핸들러에 넣을지 Effect에 넣을지 선택할 때 사용자 관점에서 어떤 종류의 로직인지 생각해 보면 된다.  

사용자의 특정 상호작용으로 인해 발생하는 것이라면 이벤트 핸들러에 두고 사용자가 화면에서 컴포넌트를 보는 것이 원인이라면 Effect에 두면 된다.

### 연쇄 계산
다른 state에 따라 각각 state를 조정하는 Effect를 체이닝하고 싶을 때가 있다.
```javascript
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);

  // 🔴 피하세요: 서로를 트리거하기 위해서만 state를 조정하는 Effect 체인
  useEffect(() => {
    if (card !== null && card.gold) {
      setGoldCardCount(c => c + 1);
    }
  }, [card]);

  useEffect(() => {
    if (goldCardCount > 3) {
      setRound(r => r + 1)
      setGoldCardCount(0);
    }
  }, [goldCardCount]);

  useEffect(() => {
    if (round > 5) {
      setIsGameOver(true);
    }
  }, [round]);

  useEffect(() => {
    alert('Good game!');
  }, [isGameOver]);

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    } else {
      setCard(nextCard);
    }
  }

  // ...
```
코드의 흐름
1. handlePlaceCard 이벤트 핸들러 호출
2. setCard로 인해 리렌더링
3. card가 업데이트 됨에 따라 1번 effect 콜백 실행
4. setGoldCardCount로 인해 리렌더링
5. goldCardCount가 업데이트 됨에 따라 2번 effect 콜백 실행
6. goldCardCount가 3보다 크면 
    - setRound 실행되어 3번 effect 콜백 실행
    - setGoldCardCount 실행되어 2번 effect 콜백 실행
7. round가 5보다 커지면 gameOver 상태를 업데이트 하고 리렌더링한다.

effect 내부에서 호출된 `set`으로 인해서 불필요한 리렌더링이 여러번 발생한다.

이 경우 렌더링 중에 가능한 것을 계산하고 이벤트 핸들러에서 state를 조정하는 것이 좋다.
```javascript
function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // ✅ 렌더링 중에 가능한 것을 계산합니다.
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // ✅ 이벤트 핸들러에서 다음 state를 모두 계산합니다.
    setCard(nextCard);
    if (nextCard.gold) {
      if (goldCardCount <= 3) {
        setGoldCardCount(goldCardCount + 1);
      } else {
        setGoldCardCount(0);
        setRound(round + 1);
        if (round === 5) {
          alert('Good game!');
        }
      }
    }
  }

  // ...
```
이벤트 핸들러 내부에서 state는 스냅샷처럼 동작한다.
예를 들어 setRound(round + 1)를 호출한 후에도 round 변수는 사용자가 버튼을 클릭한 시점의 값을 반영한다. 
계산에 다음 값을 사용해야 하는 경우 const nextRound = round + 1처럼 수동으로 정의하면 된다.

### 애플리케이션 초기화
일부 로직은 앱이 로드될 때 한 번만 실행되어햐 한다.  
그것을 최상위 컴포넌트의 Effect에 배치하고 싶을 수도 있다.
```javascript
function App() {
  // 🔴 피하세요: 한 번만 실행되어야 하는 로직이 포함된 Effect
  useEffect(() => {
    loadDataFromLocalStorage();
    checkAuthToken();
  }, []);
  // ...
}
```
일부 로직이 컴포넌트 마운트당 한 번이 아니라 앱 로드당 한 번 실행되어야 하는 경우 최상위 변수를 추가하여 이미 실행되었는지를 추적
```javascript
let didInit = false;

function App() {
  useEffect(() => {
    if (!didInit) {
      didInit = true;
      // ✅ 앱 로드당 한 번만 실행
      loadDataFromLocalStorage();
      checkAuthToken();
    }
  }, []);
  // ...
}
```
모듈 초기화 중이나 앱이 렌더링 되기 전에 실행할 수도 있다.
```javascript
if (typeof window !== 'undefined') { // 브라우저에서 실행 중인지 확인합니다.
   // ✅ 앱 로드당 한 번만 실행
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ...
}
```
컴포넌트를 import 할 때 최상위 레벨의 코드는 렌더링 되지 않더라도 한 번 실행된다.
app 전체 초기화 로직은 `App.js`와 같은 루트 컴포넌트 모듈이나 애플리케이션의 엔트리 포인트에 두는 것이 좋다.

### state 변경을 부모 컴포넌트에게 알리기
`true`또는 `false`가 될 수 있는 내부 `isOn` state를 가진 `Toggle`컴포넌트를 작성하고 있다고 가정한다.
클릭 또는 드래그를 통해 토글하는 방법에는 몇 가지가 있다.
`Toggle` 내부 state가 변경될 때마다 부모 컴포넌트에 알리고 싶을 때 `onChange`이벤트를 노출하고 Effect에서 호출한다.
```javascript
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  // 🔴 피하세요: onChange 핸들러가 너무 늦게 실행됨
  useEffect(() => {
    onChange(isOn);
  }, [isOn, onChange])

  function handleClick() {
    setIsOn(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }

  // ...
}
```
위의 코드 흐름을 보면
1. `Toggle`이 먼저 state를 업데이트하고 React가 화면을 업데이트 한다.
2. React는 Effect를 실행하고 부모 컴포넌트에서 전달된 `onChange`함수를 호출한다. 
3. 부모 컴포넌트는 자신의 state를 업데이트하고 다른 렌더링 패스를 시작한다.

이러한 방식은 이상적이지 않다. 모든 것을 한 번의 패스로 처리하는 것이 좋다.  

Effect를 삭제하고 동일한 이벤트 핸들러 내에서 두컴포넌트의 state를 업데이트를 한다.
```javascript
function Toggle({ onChange }) {
  const [isOn, setIsOn] = useState(false);

  function updateToggle(nextIsOn) {
    // ✅ 좋습니다: 업데이트를 유발한 이벤트가 발생한 동안 모든 업데이트를 수행합니다.
    setIsOn(nextIsOn);
    onChange(nextIsOn);
  }

  function handleClick() {
    updateToggle(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      updateToggle(true);
    } else {
      updateToggle(false);
    }
  }

  // ...
}
```
`Toggle`컴포넌트와 그 부모 컴포넌트 모두 이벤트가 진행되는 동안 state를 업데이트 한다. 
React는 서로 다른 컴포넌트의 업데이트를 일괄 처리하므로 렌더링 패스는 한 번만 발생한다.

state를 완전히 제거하고 대신 부모 컴포넌트로부터 `isOn`을 수신하는 방법도 있다.
```javascript
// ✅ 이것도 좋습니다: 컴포넌트는 부모에 의해 완전히 제어됩니다.
function Toggle({ isOn, onChange }) {
  function handleClick() {
    onChange(!isOn);
  }

  function handleDragEnd(e) {
    if (isCloserToRightEdge(e)) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  // ...
}
```
**state 끌어올리기**는 부모 컴포넌트가 부모 자체의 state를 토글 하여 `Toggle`을 완전히 제어할 수 있게 해준다.
두 개의 서로 다른 state 변수를 동기화하려고 할 때마다 대신 state 끌어올리기를 사용하면 좋다.

### 부모에게 데이터 전달하기
`Child`컴포넌트는 일부 데이터를 가져온 다음 Effect에서 `Parent` 컴포넌트에 전달하는 코드이다.
```javascript
function Parent() {
  const [data, setData] = useState(null);
  // ...
  return <Child onFetched={setData} />;
}

function Child({ onFetched }) {
  const data = useSomeAPI();
  // 🔴 피하세요: Effect에서 부모에게 데이터 전달하기
  useEffect(() => {
    if (data) {
      onFetched(data);
    }
  }, [onFetched, data]);
  // ...
}
```
React에서 데이터는 부모 컴포넌트에서 자식 컴포넌트로 흐른다. 
자식 컴포넌트가 Effect에서 부모 컴포넌트의 state를 업데이트하면 데이터 흐름을 추적하기가 매우 어려워진다.
```javascript
function Parent() {
  const data = useSomeAPI();
  // ...
  // ✅ 좋습니다: 자식에서 데이터를 전달
  return <Child data={data} />;
}

function Child({ data }) {
  // ...
}
```
데이터가 부모에서 자식으로 내려오기 때문에 데이터 흐름이 더 간단하고 예측 가능하게 유지된다.

### 외부 저장소 구독하기
때로는 컴포넌트가 React state 외부의 일부 데이터를 구독해야 할 수도 있다. 
이 데이터는 서드파티 라이브러리 또는 내장 브라우저 API에서 가져올 수 있다. 
이 데이터는 React가 모르는 사이에 변경될 수 있으므로 컴포넌트를 수동으로 구독해야 한다.
```javascript
function useOnlineStatus() {
  // 이상적이지 않습니다: Effect에서 저장소를 수동으로 구독
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function updateState() {
      setIsOnline(navigator.onLine);
    }

    updateState();

    window.addEventListener('online', updateState);
    window.addEventListener('offline', updateState);
    return () => {
      window.removeEventListener('online', updateState);
      window.removeEventListener('offline', updateState);
    };
  }, []);
  return isOnline;
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```
이 컴포넌트는 외부 데이터 저장소(`navigator.onLine`API)를 구독한다. 
이 API는 서버에 존재하지 않으므로(초기 HTML에 사용할 수 없으므로) 처음 state는 `true`로 설정된다.
브라우저에서 해당 데이터 저장소의 값이 변경될 때마다 컴포넌트는 해당 state를 업데이트한다.

이를 위해 Effect를 사용하는 것이 일반적이지만 React에는 외부 저장소를 구독하기 위한 Hook이 있다.
Effect를 삭제하고 `useSyncExternalStore`에 대한 호출로 대체한다.
```javascript
function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {
  // ✅ 좋습니다: 내장 Hook으로 외부 스토어 구독하기
  return useSyncExternalStore(
    subscribe, // 동일한 함수를 전달하는 한 React는 다시 구독하지 않습니다.
    () => navigator.onLine, // 클라이언트에서 값을 얻는 방법
    () => true // 서버에서 값을 얻는 방법
  );
}

function ChatIndicator() {
  const isOnline = useOnlineStatus();
  // ...
}
```
이 접근 방식은 변경 가능한 데이터를 Effect를 사용해 React state에 수동으로 동기화하는 것보다 에러가 덜 발생한다.

### 데이터 가져오기
많은 앱이 데이터 가져오기를 시작학기 위해 Effect를 사용한다. 
이와 같이 데이터를 가져오는 Effect를 작성하는 것은 매우 일반적이다.
```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // 🔴 피하세요: 정리 로직 없이 가져오기
    fetchResults(query, page).then(json => {
      setResults(json);
    });
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```
위의 코드에는 버그가 있다.
- `"hello"`를 빠르게 입력한다고 가정
- `query`가 `"h"`, `"he"`, `"hel"`, `"hell"`, `"hello"`로 바뀐다.
- 별도의 가져오기가 시작되지만 응답이 어떤 순서로 도착할지는 보장할 수 없다.
- `"hello"`응답 후에 `"hell"`응답이 도착할 수도 있다.
- `setResults()`를 마지막으로 호출하므로 잘못된 검색 결과가 표시될 수 있다.
- 이를 **경쟁 조건(race condition)** 이라고 한다.

**경쟁 조건을 수정하려면 오래된 응답을 무시하는 정리 함수를 추가해야 한다.**
```javascript
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let ignore = false;
    fetchResults(query, page).then(json => {
      if (!ignore) {
        setResults(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [query, page]);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}
```

데이터 가져오기를 구현할 때 고려해야하는 사항들
- 응답 캐싱(사용자가 뒤로가기 버튼을 클릭하여 이전 화면을 즉시 볼 수 있도록) 
- 서버에서 데이터를 가져오는 방법(초기 서버 렌더링 HTML에 스피너 대신 가져온 콘텐츠가 포함되도록)
- 네트워크 워터폴을 피하는 방법(자식이 모든 부모를 기다리지 않고 데이터를 가져올 수 있도록)

이러한 문제를 해결하는 것은 간단하지 않기 때문에 모던 프레임워크는 Effect에서 데이터를 가져오는 것보다 더 호율적인 내장 데이터 가져오기 메커니즘을 가져온다.

프레임워크를 사용하지 않고 Effect에서 데이터를 보다 인체공학적으로 가져오고 싶다면 
다음 예시와 같이 가져오기 로직을 사용자 정의 Hook으로 추출하는 것을 고려하면 좋다.
```javascript
function SearchResults({ query }) {
  const [page, setPage] = useState(1);
  const params = new URLSearchParams({ query, page });
  const results = useData(`/api/search?${params}`);

  function handleNextPageClick() {
    setPage(page + 1);
  }
  // ...
}

function useData(url) {
  const [data, setData] = useState(null);
  useEffect(() => {
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
  }, [url]);
  return data;
}
```

## 요약
- 렌더링 중에 무언가를 계산할 수 있다면 Effect가 필요하지 않다.
- 비용이 많이 드는 계산을 캐시하려면 `useEffect`대신 `useMemo`를 추가하라.
- 전체 컴포넌트 트리의 state를 초기화하려면 다른 `key`를 전달하라.
- prop변경에 대한 응답으로 특정 state bit를 초기화하려면 렌더링 중에 설정하라.
- 컴포넌트가 표시되어 실행되는 코드는 Effect에 있어야 하고 나머지는 이벤트에 있어야 한다.
- 여러 컴포넌트의 state를 업데이트해야 하는 경우 단일 이벤트 중에 수행하는 것이 좋다.
- 다른 컴포넌트의 state 변수를 동기화하려고 할 때마다 state 끌어올리기를 고려하라.
- Effect로 데이터를 가져올 수 있지만 경쟁 조건을 피하기 위해 정리를 구현해야 한다.