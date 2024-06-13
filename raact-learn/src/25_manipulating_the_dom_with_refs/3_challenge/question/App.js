/**
 * 챌린지 3 of 4: 이미지 캐러셀 스크롤링
 * 이 이미지 캐러셀은 활성화된 이미지를 전환하는 “Next” 버튼이 있습니다.
 * 클릭할 때 갤러리가 활성화된 이미지로 수평 스크롤 되도록 만들어 봅시다.
 * 활성화된 이미지의 DOM 노드에서 scrollIntoView() 호출이 필요할 수 있습니다.
 */
import {useRef, useState} from 'react';

export default function CatFriends() {
    const [index, setIndex] = useState(0);
    const selectedRef = useRef();

    return (
        <>
            <nav>
                <button onClick={() => {
                    if (index < catList.length - 1) {
                        setIndex(index + 1);
                    } else {
                        setIndex(0);
                    }
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                        <li key={cat.id}>
                            <img
                                className={
                                    index === i ?
                                        'active' :
                                        ''
                                }
                                src={cat.imageUrl}
                                alt={'Cat #' + cat.id}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

const catList = [];
for (let i = 0; i < 10; i++) {
    catList.push({
        id: i,
        imageUrl: 'https://placekitten.com/250/200?image=' + i
    });
}

