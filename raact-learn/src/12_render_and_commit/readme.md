# 렌더링 그리고 커밋

UI를 요청하고 제공하는 세 가지 단계
1. 렌더링 트리거
2. 컴포넌트 렌더링
3. DOM에 커밋

## 1. 렌더링 트리거
컴포넌트 렌더링이 일어나는 경우
1. 컴포넌트의 초기 렌더링인 경우
2. 컴포넌트의 state 업데이트된 경우

### 초기 렌더링
```javascript
import Image from './Image.js';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);
```

### State 업데이트 시 리렌더링
- `set`함수를 통해 상태를 업데이트하여 추가적인 렌더링을 트리거할 수 있다.
- 컴포넌트의 상태를 업데이트하면 자동으로 렌더링 대기열에 추가된다.

## 2. React 컴포넌트 렌더링
렌더링을 트리거한 후 React는 컴포넌트를 호출하여 화면에 표시할 내용을 파악한다.
> 렌더링 : React에서 컴포넌트를 호출하는 것

- 초기 렌더링 : 루트 컴포넌트를 호출
- 이후 렌더링 : state 업데이트가 일어나 렌더링을 트리거한 컴포넌트를 호출

## 3. React가 DOM에 변경사항을 커밋
컴포넌트를 렌더링한 후 React는 DOM을 수정한다.
- 초기 렌더링 : React는 `appendChild()`DOM API를 사용하여 생성한 모든 DOM 노드를 화면에 표시한다.
- 리렌더링 : React는 필요한 최소한의 작업을 적용하여 DOM이 최신 렌더링 출력과 일치하도록 한다.
React는 렌더링 간에 차이가 있는 경우에만 DOM노드를 변경한다.

