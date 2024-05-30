# useReducer
- 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 때 사용
- reducer는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
    ```javascript
    function reducer(state, action) {
      // 새로운 상태를 만드는 로직
      // 새로운 상태를 반환
      return newState;
    }
    ```
- action은 업데이트를 위한 정보를 가진 객체
    ```javascript
  // 더하기 액션
  {
        type : 'INCREMENT'
  }
  // 빼기 액션
  {
        type : 'DECREMENT'
  }
  // input 값 변경 액션
  {
        type : 'CHANGE_INPUT',
        key : 'email',
        value : 'test@test.com'
  }
  // 투두 등록 액션
  {
        type : 'ADD',
        todo : {
            id : 1,
            text : '할일 등록',
            isDone : false,
        } 
  }
  ```
- useReducer의 사용법
  ```javascript
    const [state, dispatch] = useReducer(reducer, initialState)
    ```
  - state : 컴포넌트에서 사용하는 상태
  - dispatch : 액션을 발생시키는 함수
  - 첫번째 파라미터 : reducer 함수
  - 두번째 파라미터 : 초기 상태