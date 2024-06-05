/**
 * 챌린지 2 of 4: 장바구니에서 항목 제거하기
 * 이 장바구니에는 작동하는 ”+” 버튼이 있지만 ”-” 버튼은 아무 기능도 하지 않습니다.
 * 이 ”-” 버튼에 해당 상품의 count가 감소하도록 하는 이벤트 핸들러를 추가해야 합니다.
 * count가 1일 때 ”-“를 누르면 상품이 장바구니에서 자동으로 제거됩니다. 0이 표시되지 않도록 합니다.
 */
import { useState } from 'react';

const initialProducts = [{
    id: 0,
    name: 'Baklava',
    count: 1,
}, {
    id: 1,
    name: 'Cheese',
    count: 5,
}, {
    id: 2,
    name: 'Spaghetti',
    count: 2,
}];

export default function ShoppingCart() {
    const [
        products,
        setProducts
    ] = useState(initialProducts)

    function handleIncreaseClick(productId) {
        setProducts(products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    count: product.count + 1
                };
            } else {
                return product;
            }
        }))
    }

    function handleDecreaseClick(productId) {
        let newProducts = products.map(product => {
            if(product.id===productId) {
                return {...product, count : product.count-1};
            }
            return product;
        });

        newProducts = newProducts.filter(product => product.count > 0);
        setProducts(newProducts);
    }

    return (
        <ul>
            {products.map(product => (
                <li key={product.id}>
                    {product.name}
                    {' '}
                    (<b>{product.count}</b>)
                    <button onClick={() => {
                        handleIncreaseClick(product.id);
                    }}>
                        +
                    </button>
                    <button onClick={() => {
                        handleDecreaseClick(product.id);
                    }}>
                        –
                    </button>
                </li>
            ))}
        </ul>
    );
}
