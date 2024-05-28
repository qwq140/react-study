import './App.css';
import {useState} from "react";

/**
 * 1. UI를 컴포넌트 계층으로 쪼개기
 * 2. React로 정적인 버전 구현하기
 *    - 앱을 만들 때는 계층 구조에 따라 하향식 또는 상향식으로 만들 수 있다.
 *    - 간단한 예시에서는 보통 하향식이 쉽지만, 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하기가 쉽다.
 * 3. 최소한의 데이터만 이용해서 완벽하게 UI State 표현하기
 *    - state는 앱이 기억해야 하는, 변경할 수 있는 데이터의 최소 집합
 *    - state를 구조화하는 데 가장 중요한 원칙은 중복배제원칙이다.
 *    - 최소한의 state를 파악하고 나머지 모든 것들은 필요에 따라 실시간으로 계산하라.
 * 4. State가 어디에 있어야 할 지 정하기
 *    React는 항상 컴포넌트 계층구조를 따라 부모에서 자식으로 데이터를 전달하는 단방향 데이터 흐름을 사용한다.
 *
 *    1) 해당 state를 기반으로 렌더링하는 모든 컴포넌트 찾기
 *    2) 그들의 가장 가까운 공통되는 부모 컴포넌트를 찾기 -> 계층에서 모두 포괄하는 상위 컴포넌트
 *    3) state가 어디에 위치 돼야 하는지 결정
 *       (1) 대개, 공통 부모에 state를 그냥 두면 된다.
 *       (2) 혹은, 공통 부모 상위의 컴포넌트에 둬도 된다.
 *       (3) state를 소유할 적절한 컴포넌트를 찾지 못했다면, state를 소유하는 컴포넌트를 하나 만들어서 상위 계층에 추가해라
 */

/**
 * 데이터
 * 1. 제품의 원본 목록
 * 2. 사용자가 입력한 검색어
 * 3. 체크박스의 값
 * 4. 필터링된 제품 목록
 *
 * state로 결정하는데의 질문
 * - 시간이 지나도 변하지 않는가? -> state가 아니다
 * - 부모로부터 props를 통해 전달되는가? -> state가 아니다.
 * - 컴포넌트 안의 다른 state나 props를 가지고 계산가능한가? -> state가 아니다.
 *
 * 1. 제품 원본 목록 -> props로 전달되기에 state가 아니다.
 * 2. 사용자가 입력한 검색어 -> 시간의 지남에 따라 변하고, 다른 요소로부터 계산할 수 없으므로 state로 볼 수 있다.
 * 3. 체크박스의 값 -> 시간에 따라 바뀌고 다른 요소로부터 계산할 수 없으므로 state로 볼 수 있다.
 * 4. 필터링된 제품 목록 -> 원본 제품 목록을 받아서 검색어와 체크박스의 값에 따라 계산할 수 있으므로 state가 아니다.
 */

/**
 * state 정하기
 * 1. state를 쓰는 컴포넌트를 찾기
 *    - ProductTable은 state에 기반한 상품 리스트를 필터링해야 한다.(검색어, 체크 박스)
 *    - SearchBar는 state를 표시해 주어야 한다.(검색어, 체크 박스)
 * 2. 공통 부모를 찾기
 *    - 둘 모두가 공유하는 첫 번째 부모는 FilterableProductTable이다.
 * 3. 어디에 state가 존재해야 할지 정하기
 *    - FilterableProductTable에 검색어와 체크 박스 값을 state로 둘 것이다.
 */

function ProductCategoryRow({category}) {
    return (
        <tr>
            <th colSpan={2}>
                {category}
            </th>
        </tr>
    );

}

/**
 * product
 * - name : 상품명
 * - price : 금액
 * - stocked : 품절여부 (품절 시 name 빨간색으로 표시)
 */
function ProductRow({product}) {
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    );
}

function ProductTable({products, filterText, inStockOnly}) {
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if (product.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow category={product.category} key={product.category}/>
            );
        }
        rows.push(
            <ProductRow product={product} key={product.name}/>
        );
        lastCategory = product.category;
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({filterText, inStockOnly}) {
    return (
        <form>
            <input type={"text"} placeholder={"Search..."} value={filterText}/>
            <label>
                <input type={"checkbox"} checked={inStockOnly}/>
                {' '}
                Only show products in stock
            </label>
        </form>
    );
}

function FilterableProductTable({products}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setIsStockOnly] = useState(false);

    return (
        <div>
            <SearchBar filterText={filterText} inStockOnly={inStockOnly}/>
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
        </div>
    );
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function App() {
    return (
        <FilterableProductTable products={PRODUCTS}/>
    );
}

export default App;
