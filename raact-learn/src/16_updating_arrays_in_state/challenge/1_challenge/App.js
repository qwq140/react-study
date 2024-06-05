/**
 * 챌린지 1 of 4: 장바구니의 항목 업데이트하기
 * ”+” 버튼을 누르면 해당 숫자가 증가하도록 handleIncreaseClick 로직을 채워보세요.
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
        const newProducts = products.map((product) => {
            if(product.id === productId) {
                return {...product, count : product.count+1};
            }
            return product;
        });
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
                </li>
            ))}
        </ul>
    );
}
