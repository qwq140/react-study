/**
 * 챌린지 1 of 4: 갤러리 완성하기
 * 마지막 조각상에서 “Next”를 누르면 코드가 충돌합니다.
 * 로직을 수정하여 이를 해결하세요.
 * 이벤트 핸들러에 추가로 로직을 추가하거나 동작이 불가능할 때 버튼을 비활성화하여 이를 처리할 수 있습니다.
 *
 * 충돌을 수정한 후, 이전 조각상을 표시하는 “Previous” 버튼을 추가하세요.
 * 첫 번째 조각상에서는 충돌이 발생하지 않아야 합니다.
 */
import { useState } from 'react';
import {sculptureList} from "../data";

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    let hasPrevious = index > 0;
    let hasNext = index < sculptureList.length - 1;

    function handleNextClick() {
        if(hasNext) setIndex(index + 1);
    }

    function handlePreviousClick() {
        if(hasPrevious) setIndex(index - 1);
    }

    function handleMoreClick() {
        setShowMore(!showMore);
    }

    let sculpture = sculptureList[index];
    return (
        <>
            <button
                onClick={handlePreviousClick}
                disabled={!hasPrevious}
            >
                Previous
            </button>
            <button
                onClick={handleNextClick}
                disabled={!hasNext}
            >
                Next
            </button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <button onClick={handleMoreClick}>
                {showMore ? 'Hide' : 'Show'} details
            </button>
            {showMore && <p>{sculpture.description}</p>}
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
        </>
    );
}
