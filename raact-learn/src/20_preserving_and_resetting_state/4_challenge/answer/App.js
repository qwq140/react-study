/**
 * 챌린지 4 of 5: 이미지가 로딩될 동안 이미지가 안 보이게 하기
 * “Next”를 누르면 브라우저는 다음 이미지를 불러오기 시작합니다.
 * 하지만 같은 <img> 태그에서 보이기 때문에 기본적으로 다음 이미지를 불러오기 전까지 기존 이미지가 나옵니다.
 * 만약 설명과 이미지가 항상 일치해야 한다면 이것은 바람직하지 않은 동작입니다.
 * “Next”를 누르는 순간 이전 이미지가 안 보이도록 바꾸어보세요.
 */
import { useState } from 'react';

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const hasNext = index < images.length - 1;

    function handleClick() {
        if (hasNext) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    }

    let image = images[index];
    return (
        <>
            <button onClick={handleClick}>
                Next
            </button>
            <h3>
                Image {index + 1} of {images.length}
            </h3>
            <img key={image.src} src={image.src} />
            <p>
                {image.place}
            </p>
        </>
    );
}

let images = [{
    place: 'Penang, Malaysia',
    src: 'https://i.imgur.com/FJeJR8M.jpg'
}, {
    place: 'Lisbon, Portugal',
    src: 'https://i.imgur.com/dB2LRbj.jpg'
}, {
    place: 'Bilbao, Spain',
    src: 'https://i.imgur.com/z08o2TS.jpg'
}, {
    place: 'Valparaíso, Chile',
    src: 'https://i.imgur.com/Y3utgTi.jpg'
}, {
    place: 'Schwyz, Switzerland',
    src: 'https://i.imgur.com/JBbMpWY.jpg'
}, {
    place: 'Prague, Czechia',
    src: 'https://i.imgur.com/QwUKKmF.jpg'
}, {
    place: 'Ljubljana, Slovenia',
    src: 'https://i.imgur.com/3aIiwfm.jpg'
}];
