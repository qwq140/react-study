/**
 * 챌린지 4 of 4: Effect 내부에서의 잘못된 데이터 페칭 고치기
 * 이 컴포넌트는 select 태그로 선택한 사람의 일대기를 보여줍니다.
 * 이 컴포넌트는 선택된 person이 변경될 때마다,
 * 또한 마운트될 때마다 비동기 함수 fetchBio(person)를 호출하여 일대기를 불러옵니다.
 * 이 비동기 함수는 Promise를 반환하며, 이 Promise는 결국 문자열로 resolve됩니다.
 * 불러오기가 완료되면 setBio를 호출하여 해당 문자열을 select의 option으로 표시합니다.
 */
/**
 * 버그가 발생하는 순서
 * - 'Bob'을 선택하면 fetchBio('Bob')가 트리거
 * - 'Taylor'을 선택하면 fetchBio('Taylor')가 트리거
 * - 'Taylor'의 일대기를 가져오는 작업이 'Bob'의 일대기를 가져오는 작업보다 먼저 완료된다.
 * - 'Taylor' 렌더링의 Effect가 setBio('This is Taylor's bio')를 호출한다.
 * - 'Bob'의 일대기를 가져오는 작업이 완료된다.
 * - 'Bob'렌더링의 Effect가 setBio('This is Bob's bio')를 호출한다.
 *
 * 이렇게 되면 Taylor가 선택되었음에도 Bob의 일대기가 표시된다.
 * 이와 같은 버그는 비동기 작업이 경쟁하며 작업 완료의 순서를 예상할 수 없는 race condition이라고 한다.
 *
 * 클린업 함수를 추가하여 race condition을 해결
 * 각 렌더링의 Effect는 자체 ignore 변수를 가지고 있다.
 * 처음에 ignore 변수는 false로 설정된다. 그러나 Effect가 클린업되면 해당 Effect는 ignore 변수는 true로 설정된다.
 * 마지막 Effect ignore만 false로 설정되므로 setBio가 호출된다.
 *
 */
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
    const [person, setPerson] = useState('Alice');
    const [bio, setBio] = useState(null);

    useEffect(() => {
        let ignore = false;
        setBio(null);
        fetchBio(person).then(result => {
            if(!ignore) {
                setBio(result);
            }
        });
        return () => {
            ignore = true;
        }
    }, [person]);

    return (
        <>
            <select value={person} onChange={e => {
                setPerson(e.target.value);
            }}>
                <option value="Alice">Alice</option>
                <option value="Bob">Bob</option>
                <option value="Taylor">Taylor</option>
            </select>
            <hr />
            <p><i>{bio ?? 'Loading...'}</i></p>
        </>
    );
}

