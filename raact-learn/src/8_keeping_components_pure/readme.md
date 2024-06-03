# 컴포넌트 순수하게 유지하기
- 자바스크립트 일부 함수는 순수하다. 
- 순수 함수는 오직 연산만을 수행한다.
- 컴포넌트를 엄격하게 순수함수로 작성하면 코드베이스가 점점 커지더라도 예상밖의 동작이나 버그를 피할 수 있다.

## 순수성 : 공식으로서의 컴포넌트
순수 함수는 다음과 같은 특징을 지니고 있는 함수이다.
- 자신의 일에 집중한다. -> 함수가 호출되기 전에 존재했던 어떤 객체나 변수는 변경하지 않는다.
- 같은 입력, 같은 출력 같은 입력이 주어졌다면 순수함수는 같은 결과를 반환해야 한다.

**React는 작성되는 모든 컴포넌트가 순수 함수일 거라 가정한다.**  
이러한 가정은 작성되는 React 컴포넌트가 같은 입력이 주어진다면 반드시 같은 JSX를 반환한다는 것을 의미한다.

```javascript
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

export default function App() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}
```
- Recipe에 drinkers={2}를 넘기면 항상 2 cups of water를 포함한 JSX 반환한다.
- drinkers={4}를 넘기면 항상 4 cups of water를 포함한 JSX를 반환한다.


## 사이드 이펙트 : 의도하지 않은 결과
```javascript
let guest = 0;

function Cup() {
  // 나쁜 지점: 이미 존재했던 변수를 변경하고 있다!
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
}
```
- 컴포넌트 바깥에 선언된 guest라는 변수를 읽고 수정함
- 컴포넌트가 여러번 불리면 다른 JSX를 생성한다는 것을 의미함

guest를 프로퍼티로 넘겨서 코드 수정
```javascript
function Cup({guest}) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
  return (
    <>
      <Cup guest={1}/>
      <Cup guest={2}/>
      <Cup guest={3}/>
    </>
  );
}
```

## 지역 변형 : 컴포넌트의 작은 비밀
렌더링하는 동안 그냥 만든 변수와 객체를 변경하는 것은 문제가 없다.
```javascript
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaGathering() {
  let cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
```
- TeaGathering의 바깥에서 생성되었다면 문제가 되ㅏㄴ다.
- TeaGathering안에 동일한 렌더링중에 생성되었기 때문에 괜찮다.
- TeaGathering밖에 어떤 코드도 이 현상이 벌어졌다는 것조차 모를 것이다. 
- 이 현상은 `지역 변형`이라 불린다.

## 부작용을 일으킬 수 있는 지점
- 사이드 이펙트 : 화면 업데이트, 애니메이션 시작, 데이터 변경
- 사이드 이펙트는 보통 이벤트 핸들러에 포함된다.
- 이벤트 핸들러가 컴포넌트 내부에 정의되었다 하더라도 렌더링 중에는 실행되지 않는다.
- 그래서 이벤트 핸들러는 순수할 필요가 없다.

