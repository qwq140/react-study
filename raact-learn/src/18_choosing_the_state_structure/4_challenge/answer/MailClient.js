/**
 * 챌린지 4 of 4: 다중 선택 구현
 * 이 예제에서 각 Letter는 isSelected prop와 선택된 것으로 표시하는 onToggle 핸들러를 갖고 있습니다.
 * 이는 작동하지만 state는 selectedId (null 또는 ID)로 저장되므로 한 번에 하나의 문자만 선택할 수 있습니다.
 *
 * 다중 선택을 지원하도록 state 구조를 변경하세요. (어떻게 구조화할까요? 코드를 작성하기 전에 이에 대해 생각해 보세요.)
 * 각 체크박스는 다른 체크박스와 독립적이어야 합니다. 선택된 문자를 클릭하면 선택이 해제되어야 합니다.
 * 마지막으로, 푸터는 선택된 항목의 올바른 수를 보여야 합니다.
 *
 * 단일 selectedId 대신 selectedIds 배열을 state 관리
 *
 * 배열이 큰 경우 includes()를 사용한 배열 검색은 선형 시간이 걸리고,
 * 개별 항목마다 검색을 수행하기 때문에 성능상 문제가 될 수 있다.
 *
 * 이를 해경하기 위해 Set을 state 보관하여 has() 연산을 사용할 수 있다.
 */
import { useState } from 'react';
import { letters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
    // const [selectedIds, setSelectedIds] = useState([]);
    const [selectedIds, setSelectedIds] = useState(new Set());

    const selectedCount = selectedIds.size;

    function handleToggle(toggledId) {
        // if(selectedIds.includes(toggledId)) {
        //     setSelectedIds(selectedIds.filter(id => id !== toggledId));
        // } else {
        //     setSelectedIds([...selectedIds, toggledId]);
        // }
        const nextIds = new Set(selectedIds);

        if(nextIds.has(toggledId)) {
            nextIds.delete(toggledId);
        } else {
            nextIds.add(toggledId)
        }

        setSelectedIds(nextIds);
    }

    return (
        <>
            <h2>Inbox</h2>
            <ul>
                {letters.map(letter => (
                    <Letter
                        key={letter.id}
                        letter={letter}
                        isSelected={
                            selectedIds.has(letter.id)
                        }
                        onToggle={handleToggle}
                    />
                ))}
                <hr />
                <p>
                    <b>
                        You selected {selectedCount} letters
                    </b>
                </p>
            </ul>
        </>
    );
}
