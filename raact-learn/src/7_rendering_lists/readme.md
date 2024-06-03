# 리스트 렌더링

## 배열을 데이터로 렌더링하기
```html
<ul>
  <li>Creola Katherine Johnson: mathematician</li>
  <li>Mario José Molina-Pasquel Henríquez: chemist</li>
  <li>Mohammad Abdus Salam: physicist</li>
  <li>Percy Lavon Julian: chemist</li>
  <li>Subrahmanyan Chandrasekhar: astrophysicist</li>
</ul>
```
데이터를 JavaScript 객체와 배열에 저장하고 `map()`과 `filter()`같은 메서드를 사용하여 해당 객체에서 컴포넌트 리스트를 렌더링할 수 있다.

1. 데이터를 배열로 이동
```javascript
const people = [
    'Creola Katherine Johnson: mathematician',
    'Mario José Molina-Pasquel Henríquez: chemist',
    'Mohammad Abdus Salam: physicist',
    'Percy Lavon Julian: chemist',
    'Subrahmanyan Chandrasekhar: astrophysicist'
];
```

2. `people`의 요소를 새로운 JSX 노드 배열인 `listItems`에 매핑한다.
```javascript
const listItems = people.map(person => <li>{person}</li>);
```

3.`<ul>`로 래핑된 컴포넌트의 listItems를 반환한다.
```javascript
return <ul>{listItems}</ul>;
```

```javascript
const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];

export default function List() {
  const listItems = people.map(person =>
    <li>{person}</li>
  );
  return <ul>{listItems}</ul>;
}
```

## 배열의 항목들을 필터링하기
```javascript
const people = [{
  id: 0,
  name: 'Creola Katherine Johnson',
  profession: 'mathematician',
}, {
  id: 1,
  name: 'Mario José Molina-Pasquel Henríquez',
  profession: 'chemist',
}, {
  id: 2,
  name: 'Mohammad Abdus Salam',
  profession: 'physicist',
}, {
  id: 3,
  name: 'Percy Lavon Julian',
  profession: 'chemist',
}, {
  id: 4,
  name: 'Subrahmanyan Chandrasekhar',
  profession: 'astrophysicist',
}];
```
직업이 `'chemist'`인 사람들만 표시한다고 가정한다.

1. `people`에서 `filter()`를 호출해서 "chemist"로만 구성된 새로운 리스트를 생성한다.
```javascript
const chemists = people.filter(person => 
    person.profession === 'chemist'
);
```

2. `chemists`를 매핑
```javascript
const listItems = chemists.map(person =>
  <li>
     <img
       src={getImageUrl(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
```

3. 컴포넌트에서 `listItems`를 반환한다.
```javascript
return <ul>{listItems}</ul>;
```

## key를 사용해서 리스트 항목을 순서대로 유지하기
리스트 항목을 렌더링할 때 아래와 같은 에러가 표시되는 걸 볼 수 있다.  
> Warning: Each child in a list should have a unique “key” prop.

각 배열 항목에 다른 항목 중에서 고유하게 식별할 수 있는 문자열 또는 숫자를 key로 지정해야 한다.
```javascript
<li key={person.id}>...</li>
```

- Key는 각 컴포넌트가 어떤 배열 항목에 해당하는지 React에 알려주어 나중에 일치시킬 수 있도록 한다.  
- 배열 항목이 정령 등으로 인해 이동하거나 삽입되거나 삭제될 수 있는 경우 중요해진다.
- key를 잘 선택하면 React가 정확히 무슨 일이 일어났는지 추론하고 DOM트리에 올바르게 업데이트 하는데 도움이 된다.

## key를 가져오는 곳
데이터 소스마다 다른 key 소스를 제공한다.
- 데이터베이스의 데이터 : 데이터베이스에서 데이터를 가져오는 경우 본질적으로 고유한 데이터베이스 key/ID를 사용할 수 있다.
- 로컬에서 생성된 데이터 : 데이터가 로컬에서 생성되고 유지되는 경우, 항목을 만들 때 증분 일련번호나  crypto.randomUUID() 또는 uuid 같은 패키지를 사용하면 된다.

## key 규칙
- key는 형제 간에 고유해야 한다. 하지만 같은 key를 다른 배열의 JSX 노드에 동일한 key를 사용해도 괜찮다.
- key는 변경되어서는 안된다.
