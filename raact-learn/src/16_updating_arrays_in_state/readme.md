# 배열 State 업데이트하기
state에 지정된 배열을 업데이트하고 싶을 때는, 새 배열을 생성한 뒤, 이 새 배열을 state로 두어 업데이트해야 한다.

## 변경하지 않고 배열 업데이트하기
- `arr[0]='bird'`처럼 배열 내부의 항목을 재할당해서는 안 되며 `push()`, `pop()` 같은 함수로 배열을 변경해서는 안된다.
- 배열을 업데이트할 때마다 새배열을 state setter 함수에 전달해야한다.
- 추가 : `concat`, `[...arr]`전개 연산자
- 제거 : `filter`, `slice`
- 교체 : `map`
- 정렬 : 배열을 복사한 이후 처리

## 배열에 항목 추가하기
```javascript
setArtists( // 아래의 새로운 배열로 state를 변경합니다.
  [
    ...artists, // 기존 배열의 모든 항목에,
    { id: nextId++, name: name } // 마지막에 새 항목을 추가합니다.
  ]
);
```
- 새로운 배열로 state 변경
- `...` Spread 연산자로 기존 배열을 복사 후 그 뒤에 새 항목을 추가

## 배열에서 항목 제거하기
`filter`함수를 사용하면 쉽게 항목을 제거할 수 있다.

## 배열 변환하기
`map()`을 사용하여 새로운 배열을 만들 수 있다.

## 배열에 항목 삽입
- `slice()`함수를 사용하면 배열의 "일부분"을 잘라낼 수 있다.
- 항목을 삽입하려면 삽입 지점 앞에 자른 배열을 전개하고, 새 항목과 원본 배열의 나머지 부분을 전개하는 배열을 만든다.

## 배열 내부의 객체 업데이트하기
- 중첩된 state를 업데이트할 때, 업데이트하려는 지점부터 최상위 레벨까지의 복사본을 만들어야 한다.

```javascript
const myNextList = [...myList];
const artwork = myNextList.find(a => a.id === artworkId);
artwork.seen = nextSeen; // 문제: 기존 항목을 변경시킵니다.
setMyList(myNextList);
```
- myNextList 배열 자체는 새로운 배열이지만, 항목 자체는 myList 원본 배열과 동일하다.
- artwork.seen을 변경하면 원본 artwork 항목이 변경된다.

위의 코드를 `map`을 사용해서 이전 항목의 변경 없이 업데이트를 시킬 수 있다.
```javascript
setMyList(myList.map(artwork => {
  if (artwork.id === artworkId) {
    // 변경된 새 객체를 만들어 반환합니다.
    return { ...artwork, seen: nextSeen };
  } else {
    // 변경시키지 않고 반환합니다.
    return artwork;
  }
}));
```

