/**
 * 챌린지 2 of 4: 검색 필드에 포커스하기
 * “Search” 버튼을 클릭하면 입력 필드에 포커스가 이동하도록 만들어 보세요.
 */
import {useRef} from "react";

export default function Page() {
    const ref = useRef(null);

    return (
        <>
            <nav>
                <button onClick={()=>{
                    ref.current.focus();
                }}>Search</button>
            </nav>
            <input
                ref={ref}
                placeholder="Looking for something?"
            />
        </>
    );
}
