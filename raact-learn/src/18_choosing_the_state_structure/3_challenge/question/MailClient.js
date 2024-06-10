/**
 * 챌린지 3 of 4: 선택 사라짐 수정하기
 * State에 letters 목록이 있습니다. 특정 문자에 호버 또는 포커스하면 하이라이트 됩니다.
 * 현재 하이라이트 된 문자는 highlightedLetter state 변수에 저장됩니다.
 * 각각의 문자에 “별표”와 “별표 해제”를 할 수 있으며, 이는 state의 letters 배열을 업데이트합니다.
 *
 * 이 코드는 작동하지만, 작은 UI 버그가 있습니다.
 * “별표” 또는 “별표 해제”를 누르면 하이라이트가 잠시 사라집니다.
 * 그러나 포인터를 움직이거나 키보드로 다른 문자로 전환하면 바로 다시 나타납니다.
 * 왜 이런 일이 발생할까요? 버튼 클릭 후 하이라이트가 사라지지 않도록 수정하세요.
 */
import { useState } from 'react';
import { initialLetters } from './data.js';
import Letter from './Letter.js';

export default function MailClient() {
    const [letters, setLetters] = useState(initialLetters);
    const [highlightedLetter, setHighlightedLetter] = useState(null);

    function handleHover(letter) {
        setHighlightedLetter(letter);
    }

    function handleStar(starred) {
        setLetters(letters.map(letter => {
            if (letter.id === starred.id) {
                return {
                    ...letter,
                    isStarred: !letter.isStarred
                };
            } else {
                return letter;
            }
        }));
    }

    return (
        <>
            <h2>Inbox</h2>
            <ul>
                {letters.map(letter => (
                    <Letter
                        key={letter.id}
                        letter={letter}
                        isHighlighted={
                            letter === highlightedLetter
                        }
                        onHover={handleHover}
                        onToggleStar={handleStar}
                    />
                ))}
            </ul>
        </>
    );
}
