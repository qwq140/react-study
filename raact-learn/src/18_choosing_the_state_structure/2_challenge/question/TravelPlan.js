/**
 * 챌린지 2 of 4: 깨진 포장 목록 수정하기
 * 이 포장 목록에는 몇 개의 항목이 포장되었는지와 전체 항목 수를 보여주는 푸터가 있습니다.
 * 처음에는 작동하는 것처럼 보이지만 버그가 있습니다.
 * 예를 들어, 항목을 포장했다고 표시했다가 삭제하면 카운터가 올바르게 업데이트되지 않습니다.
 * 항상 올바르게 작동하도록 카운터를 수정하세요.
 */
import { useState } from 'react';
import AddItem from './AddItem.js';
import PackingList from './PackingList.js';

let nextId = 3;
const initialItems = [
    { id: 0, title: 'Warm socks', packed: true },
    { id: 1, title: 'Travel journal', packed: false },
    { id: 2, title: 'Watercolors', packed: false },
];

export default function TravelPlan() {
    const [items, setItems] = useState(initialItems);
    const [total, setTotal] = useState(3);
    const [packed, setPacked] = useState(1);

    function handleAddItem(title) {
        setTotal(total + 1);
        setItems([
            ...items,
            {
                id: nextId++,
                title: title,
                packed: false
            }
        ]);
    }

    function handleChangeItem(nextItem) {
        if (nextItem.packed) {
            setPacked(packed + 1);
        } else {
            setPacked(packed - 1);
        }
        setItems(items.map(item => {
            if (item.id === nextItem.id) {
                return nextItem;
            } else {
                return item;
            }
        }));
    }

    function handleDeleteItem(itemId) {
        setTotal(total - 1);
        setItems(
            items.filter(item => item.id !== itemId)
        );
    }

    return (
        <>
            <AddItem
                onAddItem={handleAddItem}
            />
            <PackingList
                items={items}
                onChangeItem={handleChangeItem}
                onDeleteItem={handleDeleteItem}
            />
            <hr />
            <b>{packed} out of {total} packed!</b>
        </>
    );
}
