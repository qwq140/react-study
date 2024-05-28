import './App.css';

/**
 * 1. UI를 컴포넌트 계층으로 쪼개기
 * 2. React로 정적인 버전 구현하기
 *    - 앱을 만들 때는 계층 구조에 따라 하향식 또는 상향식으로 만들 수 있다.
 *    - 간단한 예시에서는 보통 하향식이 쉽지만, 프로젝트가 커지면 상향식으로 만들고 테스트를 작성하면서 개발하기가 쉽다.
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
      <span style={{color : 'red'}}>
        {product.name}
      </span>;

  return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
  );
}

function ProductTable({products}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product)=> {
    if(product.category !== lastCategory) {
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

function SearchBar() {
  return (
    <form>
      <input type={"text"} placeholder={"Search..."}/>
      <label>
        <input type={"checkbox"}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({products}) {
  return (
    <div>
      <SearchBar/>
      <ProductTable products={products}/>
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
