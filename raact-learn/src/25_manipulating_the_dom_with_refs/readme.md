# Ref로 DOM 조작하기

## ref로 노드 가져오기
```javascript
<div ref={myRef}>
```
- `useRef`Hook은 `current`라는 단일 속성을 가진 객체를 반환한다.
- `<div>`에 대한 DOM노드를 생성할 때, 이 노드에 대한 참조를 `myRef.current`에 넣는다.
- DOM 노드를 이벤트 핸들러에서 접근하거나 노드에 정의된 내장 브라우저API를 사용할 수 있다.

### ref 콜백을 사용하여 ref 리스트 관리하기
때때로 목록의 아이템마다 ref가 필요할 수도 있고, 얼마나 많은 ref가 필요할지 예측할 수 없는 경우가 있다.
```javascript
<ul>
  {items.map((item) => {
    // 작동하지 않습니다!
    const ref = useRef(null);
    return <li ref={ref} />;
  })}
</ul>
```
Hook은 컴포넌트 최상단에서만 호출되어야 하기 때문에 위의 코드는 동작하지 않는다.

#### 해결방법
- ref콜백 : `ref`어트리뷰트에 함수를 전달하는 것
- React는 ref를 설정할 때 DOM 노드와 함께 ref 콜백을 호출하며, ref를 지울 때에는 null을 전달한다.
```javascript
import { useRef, useState } from "react";

export default function CatFriends() {
  const itemsRef = useRef(null);
  const [catList, setCatList] = useState(setupCatList);

  function scrollToCat(cat) {
    const map = getMap();
    const node = map.get(cat);
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // 처음 사용하는 경우, Map을 초기화합니다.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0])}>Tom</button>
        <button onClick={() => scrollToCat(catList[5])}>Maru</button>
        <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat}
              ref={(node) => {
                const map = getMap();
                if (node) {
                  map.set(cat, node);
                } else {
                  map.delete(cat);
                }
              }}
            >
              <img src={cat} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  const catList = [];
  for (let i = 0; i < 10; i++) {
    catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
  }

  return catList;
}
```
- itemRef는 식별자와 DOM노드로 연결된 Map을 가지고 있다.
- 리스트 아이템에 있는 ref콜백은 Map 변경을 처리한다.

## 다른 컴포넌트의 DOM 노드 접근
[예제코드](./accessing_another_component_dom_node/App.js)
- 내장 컴포넌트에 ref를 주입할 때 React는 ref의 current 프로퍼티를 DOM 노드로 설정한다.
- 직접 만든 컴포넌트에 ref를 주입할 때는 null이 기본적으로 주어진다.
- React는 기본적으로 다른 컴포넌트의 DOM 노드에 접근하는 것을 허용하지 않는다.
- forwardRef API를 사용하여 ref를 전달받을 수 있다.
```javascript
const MyInput = forwardRef((props, ref) => {
    return <input {...props} ref={ref} />;
});
```

## React가 ref를 부여할 때
- 렌더링 단계 : React는 화면에 무엇을 그려야 하는지 알아내도록 컴포넌트를 호출
- 커밋 단계 : React는 변경사항을 DOM에 적용
- React는 `ref.current`를 커밋 단계에서 설정한다.
- DOM 변경 전에는 `ref.current`값을 null로 설정한다.
- DOM 변경 후 대응하는 DOM 노드로 다시 설정한다.
- 대부분 `ref`접근은 이벤트 핸들러 안에서 일어난다.