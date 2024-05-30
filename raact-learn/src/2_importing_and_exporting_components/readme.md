# 컴포넌트 import 및 export 하기

## 학습 내용
- 컴포넌트를 import 하거나 export 하는 방법
- 언제 default 또는 named imports와 exports를 사용할지
- 한 파일에서 여러 컴포넌트를 import하거나 export하는 방법
- 여러 컴포넌트를 여러 파일로 분리하는 방법

## 컴포넌트를 import 하거나 export 하는 방법
컴포넌트를 다른 파일로 이동하는 단계
1. 컴포넌트를 추가할 JS파일을 생성한다.
2. 새로 만든 파일에서 함수 컴포넌트를 export한다.
3. 컴포넌트를 사용할 파일에서 import한다.

### Default and Named Exports
- 한 파일에서는 하나의 default export만 존재할 수 있고 named export는 여러 개가 존재할 수 있다.

|Syntax|Export구문|Import구문|
|---|---|---|
|Default|export default function Button(){}|import Button from './button.js';|
|Named|export function Button(){}|import {Button} from './button.js';|

보편적으로 한 파일에서 하나의 컴포넌트만 export할 때 default export 방식을 사용하고 여러 컴포넌트를 export할 경우엔 named export방식을 사용한다.

