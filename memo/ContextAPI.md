# Context API
- 여러개의 컴포넌트를 거쳐서 파라미터로 전달하는 것은 매우 번거로운 작업이다.
- Context API를 이용하면 복잡한 구조를 해결할 수 있다.
- Context API를 사용하면, 프로젝트 안에서 전역적으로 값을 관리할 수 있다.
- Context를 만들때는 createContext()를 사용
- Context안에 Provider라는 컴포넌트를 통하여 Context의 값을 정할 수 있음
  ```javascript
    <TodoDispatchContext.Provider value={dispatch}>...</TodoDispatchContext.Provider>
    ```