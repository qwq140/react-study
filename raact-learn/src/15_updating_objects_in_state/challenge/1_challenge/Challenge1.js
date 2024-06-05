/**
 * 챌린지 1 of 3: 잘못된 state 업데이트 고치기
 * 이 폼은 몇 가지 문제가 있습니다. 스코어를 올리는 버튼을 몇 번 클릭해 보세요.
 * 스코어가 올라가지 않는 것을 확인하세요.
 * 그리고 first name을 수정하여, 스코어가 갑자기 당신의 수정 사항을 “따라잡은” 것을 확인하세요.
 * 마지막으로 last name을 수정하여, 스코어가 완전하게 사라진 것을 확인하세요.
 *
 * 이 모든 버그를 올바르게 수정하는 것이 당신의 일입니다. 고칠 때마다 각각의 문제가 왜 발생하는지 설명해 보세요.
 */
import { useState } from 'react';

export default function Scoreboard() {
    const [player, setPlayer] = useState({
        firstName: 'Ranjani',
        lastName: 'Shettar',
        score: 10,
    });

    function handlePlusClick() {
        setPlayer({
            ...player,
            score : player.score+1,
        });
    }

    function handleFirstNameChange(e) {
        setPlayer({
            ...player,
            firstName: e.target.value,
        });
    }

    function handleLastNameChange(e) {
        setPlayer({
            ...player,
            lastName: e.target.value
        });
    }

    return (
        <>
            <label>
                Score: <b>{player.score}</b>
                {' '}
                <button onClick={handlePlusClick}>
                    +1
                </button>
            </label>
            <label>
                First name:
                <input
                    value={player.firstName}
                    onChange={handleFirstNameChange}
                />
            </label>
            <label>
                Last name:
                <input
                    value={player.lastName}
                    onChange={handleLastNameChange}
                />
            </label>
        </>
    );
}
