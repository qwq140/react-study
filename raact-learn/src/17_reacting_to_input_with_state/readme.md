# State를 사용해 Input 다루기

## 선언형 UI와 명령형 UI 비교
유저가 폼을 제출한다고 가정할 때 

### 명령형 프로그래밍에서 인터랙션을 구현
- 폼에 무언가를 입력하면 "제출"버튼이 활성화될 것이다.
- "제출"버튼을 누르면 폼과 버튼이 비활성홛되고 스피너가 나타날 것이다.
- 네트워크 요청이 성공하면 폼은 숨겨질 것이고 "감사합니다." 메시지가 나타날 것이다.
- 네트워크 요청이 실패하면 오류 메시지가 보일 것이고 폼은 다시 활성화될 것이다.

```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    disable(textarea);
    disable(button);
    show(loadingMessage);
    hide(errorMessage);
    try {
        await submitForm(textarea.value);
        show(successMessage);
        hide(form);
    } catch (err) {
        show(errorMessage);
        errorMessage.textContent = err.message;
    } finally {
        hide(loadingMessage);
        enable(textarea);
        enable(button);
    }
}

function handleTextareaChange() {
    if (textarea.value.length === 0) {
        disable(button);
    } else {
        enable(button);
    }
}

function hide(el) {
    el.style.display = 'none';
}

function show(el) {
    el.style.display = '';
}

function enable(el) {
    el.disabled = false;
}

function disable(el) {
    el.disabled = true;
}

function submitForm(answer) {
    // 네트워크에 접속한다고 가정해봅시다.
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (answer.toLowerCase() === 'istanbul') {
                resolve();
            } else {
                reject(new Error('Good guess but a wrong answer. Try again!'));
            }
        }, 1500);
    });
}

let form = document.getElementById('form');
let textarea = document.getElementById('textarea');
let button = document.getElementById('button');
let loadingMessage = document.getElementById('loading');
let errorMessage = document.getElementById('error');
let successMessage = document.getElementById('success');
form.onsubmit = handleFormSubmit;
textarea.oninput = handleTextareaChange;
```
위와 같이 UI를 조작하면 더 복잡한 시스템에서는 난이도가 올라간다.  
리액트에서는 직접 UI를 조작할 필요가 없다. 대신에 **무엇을 보여주고 싶은지 선언**하기만 하면 된다.

### UI를 선언적인 방식으로 생각하기
UI를 리액트에서 다시 구현하는 과정
1. 컴포넌트의 다양한 시각적 state를 확인
2. 무엇이 state 변화를 트리거하는지 확인
3. useState를 사용해서 메모리의 state를 표현
4. 불필요한 state 변수를 제거
5. state 설정을 위해 이벤트 핸들러 연결

#### 1. 컴포넌트의 다양한 시각적 state 확인
사용자가 볼 수 있는 UI의 모든 "state"를 시각화해야 한다.
- Empty : 폼은 비활성화된 "제출"버튼을 가지고 있다.
- Typing : 폼은 활성화된 "제출" 버튼을 가지고 있다.
- Submitting : 폼은 완전히 비활성화되고 스피너가 보인다.
- Success : 폼 대신에 "감사합니다" 메시지가 보인다.
- Error : "Typing" state와 동일하지만 오류 메시지가 보인다.

폼의 모형은 `status` prop에 의해 결정된다. (success일 때는 폼이 없고 성공 메시지가 출력된다 나머지의 경우 폼이 나타나있다)
```javascript
export default function Form({
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea />
        <br />
        <button>
          Submit
        </button>
      </form>
    </>
  )
}
```
폼의 모형일 때 `status` prop에 의해 버튼 활성화 여부, 실패 메시지, 스피너 등이 컨트롤 된다.
```javascript
export default function Form({
  // 'submitting', 'error', 'success'로 한 번 변경해보세요:
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}
```
- `status === 'submitting'` : textarea, button이 비활성화 된다.
- `status === 'empty'` : button이 비활성화 된다.
- `status === 'error'` : 실패 메시지가 출력된다.

#### 2. 무엇이 state 변화를 트리거하는지 알아내기
두 종류의 인풋 유형으로 state 변경을 트리거할 수 있다.
- 버튼 클릭, 필드 입력, 링크 이동 등의 **휴먼 인풋**
- 네트워크 응답, 타입아웃, 이미지 로딩 등의 **컴퓨터 인풋**

UI를 업데이트하기 위해서는 state 변수를 설정해야 한다.
- 텍스트 인풋을 변경(휴면) : 텍스트 상자 비어있는지 여부에 따라 state를 Empty, Typing 변경해야한다.
- 제출 버튼 클릭(휴먼) : Submmitting state를 변경
- 네트워크 응답 성공(컴퓨터) : Success state를 변경
- 네트워크 응답 실패(컴퓨터) : Error state 변경

#### 3. 메모리의 state를 useState로 표현
- state 변수는 적을수록 좋다.
1. 반드시 필요한 state를 설정
   - 인풋의 응답
   - 가장 최근에 발생한 오류
    ```javascript
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    ```
2. 가능한 모든 시각적 state를 커버할 수 있는 것을 추가
```javascript
const [isEmpty, setIsEmpty] = useState(true);
const [isTyping, setIsTyping] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [isError, setIsError] = useState(false);
```

#### 4. 불필요한 state 변수를 제거
- state의 중복은 피하고 필수적인 state만 남겨두기
- state 변수에 관한 질문
  - state가 역설을 일으키지 않는가?
    - `isTyping`과 `isSubmitting`이 동시에 `true`일 수는 없다.
    - `typing`, `submitting`, `succeess`을 하나의 `status`로 합칠 수 있다.
  - 다른 state 변수에 이미 같은 정보가 담겨있진 않는가?
    - `isEmpty`와 `isTyping`은 동시에 `true`가 될 수 없다.
    - 여기서는 `isEmpty`를 지우고 `answer.length === 0`으로 체크가 가능하다.
  - 다른 변수를 뒤집었을 때 같은 정보를 얻을 수 있진 않는가?
    - `isError`는 `error !== null`로도 대신 확인 할 수 있다.
- 정리 과정 거친 후에 남은 변수
```javascript
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing'); // 'typing', 'submitting', or 'success'
```

#### 5. state 설정을 위해 이벤트 핸들러 연결
```javascript
import { useState } from 'react';

export default function Form() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('typing'); // typing, submitting, success

    if (status === 'success') {
        return <h1>That's right!</h1>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            await submitForm(answer);
            setStatus('success');
        } catch (err) {
            setStatus('typing');
            setError(err);
        }
    }

    function handleTextareaChange(e) {
        setAnswer(e.target.value);
    }

    return (
        <>
            <h2>City quiz</h2>
            <p>
                In which city is there a billboard that turns air into drinkable water?
            </p>
            <form onSubmit={handleSubmit}>
        <textarea
            value={answer}
            onChange={handleTextareaChange}
            disabled={status === 'submitting'}
        />
                <br />
                <button disabled={
                    answer.length === 0 ||
                    status === 'submitting'
                }>
                    Submit
                </button>
                {error !== null &&
                    <p className="Error">
                        {error.message}
                    </p>
                }
            </form>
        </>
    );
}

function submitForm(answer) {
    // 네트워크에 접속한다고 가정
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error('Good guess but a wrong answer. Try again!'));
            } else {
                resolve();
            }
        }, 1500);
    });
}
```

## 요약
- 선언형 프로그래밍은 각각의 시각적 state로 UI를 묘사하는 것을 의미한다.
- 컴포넌트 개발
  1. 모든 시각적 state를 확인.
  2. 휴먼이나 컴퓨터가 state 변화를 어떻게 트리거 하는지 알아내라.
  3. useState로 state를 모델링
  4. 버그와 모순을 피하려면 불필요한 state를 제거
  5. state 설정을 위해 이벤트 핸들러 연결