/**
 * 항목의 중요한 정도를 &&로 표시합니다.
 *
 * 이 예시에서 각 Item은 숫자 타입인 importance를 props로 받습니다. && 연산자를 사용하여 “(Importance: X)“를 이탤릭체로 렌더링하되 난이도가 0이 아닌 항목만 렌더링합니다. 항목 목록은 다음과 같이 표시합니다.
 *
 * Space suit (Importance: 9)
 * Helmet with a golden leaf
 * Photo of Tam (Importance: 6)
 * 두 레이블 사이에 공백을 추가하는 것을 잊지 마세요!
 */

function Item({ name, importance }) {
    return (
        <li className="item">
            {name} {importance > 0 && <i>(Importance: {importance})</i>}
        </li>
    );
}

export default function PackingList() {
    return (
        <section>
            <h1>Sally Ride's Packing List</h1>
            <ul>
                <Item
                    importance={9}
                    name="Space suit"
                />
                <Item
                    importance={0}
                    name="Helmet with a golden leaf"
                />
                <Item
                    importance={6}
                    name="Photo of Tam"
                />
            </ul>
        </section>
    );
}