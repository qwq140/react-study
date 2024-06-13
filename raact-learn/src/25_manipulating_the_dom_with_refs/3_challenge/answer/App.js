/**
 * 챌린지 3 of 4: 이미지 캐러셀 스크롤링
 * 이 이미지 캐러셀은 활성화된 이미지를 전환하는 “Next” 버튼이 있습니다.
 * 클릭할 때 갤러리가 활성화된 이미지로 수평 스크롤 되도록 만들어 봅시다.
 * 활성화된 이미지의 DOM 노드에서 scrollIntoView() 호출이 필요할 수 있습니다.
 */
import {useRef, useState} from 'react';
import { flushSync } from 'react-dom';

export default function CatFriends() {
    const [index, setIndex] = useState(0);
    const selectedRef = useRef();

    return (
        <>
            <nav>
                <button onClick={() => {
                    // 스크롤 하기 전에 React가 DOM 변경을 끝내기 위해 flushSync를 사용
                    // flushSync는 React에게 제공된 콜백 내부의 모든 업데이트를 동기적으로 처리하도록 강제한다.
                    // DOM이 즉시 업데이트되는 것을 보장한다.
                    flushSync(()=>{
                        if (index < catList.length - 1) {
                            setIndex(index + 1);
                        } else {
                            setIndex(0);
                        }
                    });

                    selectedRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }}>
                    Next
                </button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat, i) => (
                        // index === i 조건이 만족하면 해당 인덱스의 이미지가 선택된 이미지
                        // 선택된 이미지는 ref를 받는다.
                        <li key={cat.id} ref={index === i ? selectedRef : null}>
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

