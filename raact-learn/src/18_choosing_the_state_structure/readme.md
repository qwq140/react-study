# State 구조 선택하기

## State 구조화 원칙
상태를 갖는 구성요소를 작성할 때, 사용할 state 변수의 수와 데이터의 형태를 선택해야 한다.
1. 연관된 state 그룹화하기  
   두 개 이상의 state 변수를 동시에 업데이트한다면 단일 state 변수로 병합하는 것을 고려
2. State 모순 피하기  
3. 불필요한 state 피하기  
   컴포넌트의 props나 기존 state 변수에서 계산할 수 있다면 state로 관리하지 않기
4. State의 중복 피하기  
5. 깊게 중첩된 state 피하기  
   가능하면 state를 평탄한 방식으로 구성하는 것이 좋다

## 연관된 state 그룹화하기
```javascript
const [x, setX] = useState(0);
const [y, setY] = useState(0);
```

```javascript
const [position, setPosition] = useState({ x: 0, y: 0 });
```

두 개의 state 변수가 항상 함께 변경된다면, 단일 state 변수로 통합하는 것이 좋다.

[예제 코드](./Example1.js)

예제 코드는 마우스 커서가 움직일 때 빨간 점의 좌표가 업데이트 된다. 이와 같이 state가 같이 업데이트되는 경우에는 단일 state로 통합하는 것이 좋다.

## State의 모순 피하기
[예제 코드](./Example2.js)

- 불가능한 state를 허용한다.
- `setIsSent`와 `setIsSending`을 함께 호출하는 것을 잊어버린 경우, `isSending`과 `isSent`가 동시에 true인 상황이 나올 수 있다.
- `isSending`과 `isSent`는 동시에 true가 되면 안된다.
- `status` state 변수로 대체한다.
- `status` 변수는 `typing`, `sending`, `sent`세 가지 유효한 상태 중 하나를 가질 수 있다.

## 불필요한 state 피하기
컴포넌트의 props나 기존 state 변수에서 일부 정보를 계산할 수 있다면, 컴포넌트의 state에 해당 정보를 넣지 않아야 한다.

[예제 코드](./Example3.js)

```javascript
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
```
렌더링 중에 firstName과 lastName에서 fullName을 계산할 수 있기 때문에 fullName은 state로 관리할 필요가 없다.

## State의 중복 피하기
[예제 코드](./Example4.js)

- `selectedItem`의 내용이 `items` 목록 내의 항목 중 하나와 동일한 객체이다.
- 이렇게 되었을 때 문제점
- "Choose"를 클릭한 후 편집을 하면, 입력은 업데이트되지만, 하단의 라벨은 반영되지 않는다.
- `selectedItem`도 같이 업데이트하는 방법도 있지만 더 쉬운 수정 방법은 중복을 제거하는 것이다.
- `selectedItem` 대신 `selectedId`를 state로 유지하고 `items`에서 `selectedId`로 항목을 검색해서 가져오는 것이 좋다.

## 깊게 중첩된 state 피하기
[React 예제 코드](./Example5.js)  
[data 예제](./places.js)

```javascript
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ place }) {
  const childPlaces = place.childPlaces;
  return (
    <li>
      {place.title}
      {childPlaces.length > 0 && (
        <ol>
          {childPlaces.map(place => (
            <PlaceTree key={place.id} place={place} />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const planets = plan.childPlaces;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planets.map(place => (
          <PlaceTree key={place.id} place={place} />
        ))}
      </ol>
    </>
  );
}
```

깊게 중첩된 state를 업데이트하는 것은 변경된 부분부터 모든 객체의 복사본을 만드는 것을 의미한다. 이러한 코드는 장황할 수 있다.  
**state가 쉽게 업데이트하기에 너무 중첩되어 있다면, 평탄하게 만드는 것을 고려해라**  
`place`가 자식 장소의 배열을 가지는 트리 구조 대신, 각 장소가 자식 장소ID의 배열을 가지도록 구조화하는 방식이 있다.

[수정된 data 예제](./places_renewal.js)

```javascript
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

function PlaceTree({ id, placesById }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {childIds.length > 0 && (
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              placesById={placesById}
            />
          ))}
        </ol>
      )}
    </li>
  );
}

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            placesById={plan}
          />
        ))}
      </ol>
    </>
  );
}
```

이제 장소를 제거하기 위해, state의 두 단계만 업데이트하면 된다.
- 업데이트된 버전의 부모장소는 `childIds`배열에서 제거된 ID를 제외해야 한다.
- 업데이트된 버전의 루트 "테이블"객체는 부모 장소의 업데이트된 버전을 포함해야 한다.

```javascript
import { useState } from 'react';
import { initialTravelPlan } from './places.js';

export default function TravelPlan() {
  const [plan, setPlan] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan[parentId];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id => id !== childId)
    };
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      [parentId]: nextParent
    });
  }

  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {planetIds.map(id => (
          <PlaceTree
            key={id}
            id={id}
            parentId={0}
            placesById={plan}
            onComplete={handleComplete}
          />
        ))}
      </ol>
    </>
  );
}

function PlaceTree({ id, parentId, placesById, onComplete }) {
  const place = placesById[id];
  const childIds = place.childIds;
  return (
    <li>
      {place.title}
      <button onClick={() => {
        onComplete(parentId, id);
      }}>
        Complete
      </button>
      {childIds.length > 0 &&
        <ol>
          {childIds.map(childId => (
            <PlaceTree
              key={childId}
              id={childId}
              parentId={id}
              placesById={placesById}
              onComplete={onComplete}
            />
          ))}
        </ol>
      }
    </li>
  );
}
```