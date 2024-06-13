import { useRef, useState } from "react";

export default function CatFriends() {
    const itemsRef = useRef(null);
    const [catList, setCatList] = useState(setupCatList);

    function scrollToCat(cat) {
        const map = getMap();
        const node = map.get(cat);
        node.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }

    function getMap() {
        if (!itemsRef.current) {
            // 처음 사용하는 경우, Map을 초기화합니다.
            itemsRef.current = new Map();
        }
        return itemsRef.current;
    }

    return (
        <>
            <nav>
                <button onClick={() => scrollToCat(catList[0])}>Tom</button>
                <button onClick={() => scrollToCat(catList[5])}>Maru</button>
                <button onClick={() => scrollToCat(catList[9])}>Jellylorum</button>
            </nav>
            <div>
                <ul>
                    {catList.map((cat) => (
                        <li
                            key={cat}
                            ref={(node) => {
                                const map = getMap();
                                if (node) {
                                    map.set(cat, node);
                                } else {
                                    map.delete(cat);
                                }
                            }}
                        >
                            <img src={cat} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

function setupCatList() {
    const catList = [];
    for (let i = 0; i < 10; i++) {
        catList.push("https://loremflickr.com/320/240/cat?lock=" + i);
    }

    return catList;
}

