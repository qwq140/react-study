/**
 * 챌린지 1 of 1: Context로 prop drilling 대체하기
 * 다음의 예시에서 체크 박스를 토글하는 것은 각각의 <PlaceImage>에 전달된 imageSize prop을 변경합니다.
 * 체크 박스의 state는 App 컴포넌트의 최상단에서 가지고 있지만 <PlaceImage>에서 그 값을 알아야 합니다.
 *
 * 현재는 App이 imageSize를 List에 전달하면 또 Place에 전달하고 다시 PlaceImage에 전달하고 있습니다.
 * imageSize prop을 제거하고 App 컴포넌트가 직접 PlaceImage에 값을 전달하도록 해봅시다.
 *
 * Context를 Context.js에 선언합니다.
 */
import {useContext, useState} from 'react';
import { places } from './data.js';
import { getImageUrl } from './utils.js';
import {ImageSizeContext} from "./Context";

export default function App() {
    const [isLarge, setIsLarge] = useState(false);
    const imageSize = isLarge ? 150 : 100;
    return (
        <ImageSizeContext.Provider value={imageSize}>
            <label>
                <input
                    type="checkbox"
                    checked={isLarge}
                    onChange={e => {
                        setIsLarge(e.target.checked);
                    }}
                />
                Use large images
            </label>
            <hr />
            <List/>
        </ImageSizeContext.Provider>
    )
}

function List() {
    const listItems = places.map(place =>
        <li key={place.id}>
            <Place
                place={place}
            />
        </li>
    );
    return <ul>{listItems}</ul>;
}

function Place({ place}) {
    return (
        <>
            <PlaceImage
                place={place}
            />
            <p>
                <b>{place.name}</b>
                {': ' + place.description}
            </p>
        </>
    );
}

function PlaceImage({ place}) {
    const imageSize = useContext(ImageSizeContext);
    return (
        <img
            src={getImageUrl(place)}
            alt={place.name}
            width={imageSize}
            height={imageSize}
        />
    );
}
