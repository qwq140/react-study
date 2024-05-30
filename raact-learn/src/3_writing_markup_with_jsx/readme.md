# JSX로 마크업 작성하기

## 학습 내용
- React에서 마크업과 렌더링 로직을 같이 사용하는 이유
- JSX와 HTML의 차이점
- JSX로 정보를 보여주는 방법

## JSX : JavaScript에 마크업 넣기
- React 컴포넌트는 React가 브라우저에 마크업을 렌더링할 수있는 JavaScript 함수이다.
- React 컴포넌트는 JSX라는 확장된 문법을 사용하여 마크업을 나타낸다.
>JSX와 React는 서로 다른 별개의 개념이다. 종종 함께 사용되기도 하지만 [독립적으로](https://ko.legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) 사용할 수 도 있다. JSX는 확장된 문법이고, React는 JavaScript 라이브러리이다.

## HTML을 JSX로 변환하기
```html
<h1>Hedy Lamarr's Todos</h1>
<img
  src="https://i.imgur.com/yXOvdOSs.jpg"
  alt="Hedy Lamarr"
  class="photo"
>
<ul>
    <li>Invent new traffic lights
    <li>Rehearse a movie scene
    <li>Improve the spectrum technology
</ul>
```
단순히 위의 코드를 복사하여 붙여넣는다면 동작하지 않는다.
### JSX 규칙

#### 1. 하나의 루트 엘리먼트로 반환하기
한 컴포넌트에서 여러 엘리먼트를 반환하려면, 하나의 부모 태그로 감싸줘야한다.


#### 2. 모든 태그는 닫아주기
- JSX에서는 태크를 명시적으로 닫아줘야한다. 
- `<img>`처럼 자체적으로 닫아주는 태그는 반드시 `<img/>`형태로 작성해야한다.
- `<li>` 같은 래핑 태그도 `<li></li>` 형태로 작성해야 한다.

#### 3. 대부분 카멜 케이스로!
- JSX JavaScript로 바뀌고 JSX에서 작성된 어트리뷰트는 JavaScript 객체의 키가 된다.
- JavaScript는 변수명에 제한이 있다.
- 변수명 대시를 포함하거나 `class`처럼 예약어를 사용할 수 없다.

### JSX로 변환한 결과
```javascript
export default function TodoList() {
    return (
        <>
            <h1>Hedy Lamarr's Todos</h1>
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                class="photo"
            />
            <ul>
                <li>Invent new traffic lights</li>
                <li>Rehearse a movie scene</li>
                <li>Improve the spectrum technology</li>
            </ul>
        </>
    );
}
```

## 팁 : JSX 변환기 사용하기
https://transform.tools/html-to-jsx