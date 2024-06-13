/**
 * 챌린지 4 of 4: Effect 내부에서의 잘못된 데이터 페칭 고치기
 * 이 컴포넌트는 select 태그로 선택한 사람의 일대기를 보여줍니다.
 * 이 컴포넌트는 선택된 person이 변경될 때마다,
 * 또한 마운트될 때마다 비동기 함수 fetchBio(person)를 호출하여 일대기를 불러옵니다.
 * 이 비동기 함수는 Promise를 반환하며, 이 Promise는 결국 문자열로 resolve됩니다.
 * 불러오기가 완료되면 setBio를 호출하여 해당 문자열을 select의 option으로 표시합니다.
 */
import { useState, useEffect } from 'react';
import { fetchBio } from './api.js';

export default function Page() {
    const [person, setPerson] = useState('Alice');
    const [bio, setBio] = useState(null);

    useEffect(() => {
        setBio(null);
        fetchBio(person).then(result => {
            setBio(result);
        });
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
