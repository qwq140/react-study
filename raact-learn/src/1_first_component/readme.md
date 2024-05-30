# 첫 번째 컴포넌트
## 학습내용
> - 컴포넌트가 무엇일까
> - React 애플리케이션에서 컴포넌트의 역할
> - 첫 번째 React 컴포넌트를 작성하는 방법

## 컴포넌트 : UI 구성 요소
```html
<article>
  <h1>My First Component</h1>
  <ol>
    <li>Components: UI Building Blocks</li>
    <li>Defining a Component</li>
    <li>Using a Component</li>
  </ol>
</article>
```
React를 사용하면 마크업, CSS, JavaScript를 앱의 재사용 가능한 UI 요소인 사용자 정의 "컴포넌트로"로 결합할 수 있다.
```javascript
<PageLayout>
    <NavigationHeader>
        <SearchBar />
        <Link to="/docs">Docs</Link>
    </NavigationHeader>
    <Sidebar />
    <PageContent>
        <TableOfContents />
        <DocumentationText />
    </PageContent>
</PageLayout>
```
프로젝트가 성장함에 따라 이미 작성한 컴포넌트를 재사용하여 많은 디자인을 구성할 수 있으므로 개발 속도가 빨라진다.

## 컴포넌트 정의하기
React 컴포넌트는 마크업으로 뿌릴 수 있는 JavaScript 함수이다.
### Step 1 : 컴포넌트 내보내기
export default를 사용하면 나중에 다른 파일에서 가져올 수 있도록 파일에 주요 기능을 표시할 수 있다.
### Step 2 : 함수 정의하기
function Profile(){} 를 사용하면 Profile 이라는 이름의 JavaScript함수를 정의할 수 있다.
> React 컴포넌트는 일반 JavaScript 함수이지만, 이름은 대문자로 시작해야 한다. 그렇지 않으면 작동하지 않는다.
### Step 3 : 마크업 추가하기
리액트에서는 JSX구문을 사용한다. JavaScript안에 마크업을 삽입할 수 있다.
```javascript
export default function Profile() {
    return (
        <img
            src="https://i.imgur.com/MK3eW3Am.jpg"
            alt="Katherine Johnson"
        />
    )
}
```
## 컴포넌트 사용하기
```javascript
export default function Gallery() {
    return (
        <section>
            <h1>Amazing scientists</h1>
            <Profile/>
            <Profile/>
            <Profile/>
        </section>
    );
}
```

## 브라우저에 표시되는 내용
- `<section>`은 소문자이므로 React는 HTML태그를 가리킨다고 이해함.
- `<Profile/>`은 대문자로 시작하므로 React는 `Profile`이라는 컴포넌트를 사용하고자 한다고 이해함.
- 브라우저에 표시되는 내용
```html
<section>
  <h1>Amazing scientists</h1>
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />
</section>
```

## 컴포넌트 중첩 및 구성
- 컴포넌트는 일반 JavaScript함수이므로 같은 파일에 여러 컴포넌트를 포함할 수 있다.
- 별도의 파일로 컴포넌트를 옮길 수 있다.
- `Profile` 컴포넌트는 `Gallery`안에서 렌더링되기 때문에 `Gallery`는 `Profile`을 렌더링하는 부모 컴포넌트이다.
- 컴포넌트를 한 번 정의한 다음 원하는 곳에서 원하는 만큼 사용할 수 있는 점이 React의 장점이다.

> 컴포넌트 정의를 중접해서는 안된다.  
> 최상위 레벨에서 컴포넌트를 정의해야한다.


## 요약
- React는 앱의 재사용 가능한 UI 요소인 컴포넌트를 만들 수 있다.
- React 앱에서 모든 UI는 컴포넌트이다.
- React 컴포넌트는 다음 몇 가지를 제외하고는 일반적인 JavaScript 함수이다.
  1. 컴포넌트의 이름은 항상 대문자로 시작한다.
  2. JSX 마크업을 반환한다.