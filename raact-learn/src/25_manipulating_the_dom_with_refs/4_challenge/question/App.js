/**
 * 챌린지 4 of 4: 별개의 컴포넌트에서 검색 필드에 포커스 이동하기
 * “Search” 버튼을 클릭하면 포커스가 필드에 놓이도록 해보세요.
 * 각 컴포넌트는 별개의 파일에 정의되어 있고 코드의 위치를 옮겨서는 안 된다는 점을 명심하세요.
 * 별개의 컴포넌트들을 어떻게 연결할 수 있을까요?
 */
import SearchButton from './SearchButton.js';
import SearchInput from './SearchInput.js';

export default function Page() {
    return (
        <>
            <nav>
                <SearchButton />
            </nav>
            <SearchInput/>
        </>
    );
}
