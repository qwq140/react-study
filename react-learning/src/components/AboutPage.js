
// 컴포넌트는 여러 개의 JSX 태그를 반환할 수 없다.
// <div>...</div> 또는 <>...</> 래퍼와 같이 공유되는 부모로 감싸야 한다.
export function AboutPage() {
    return (
        <>
            <h1>About</h1>
            <p>Hello there. <br/> How do you do?</p>
        </>
    )
}