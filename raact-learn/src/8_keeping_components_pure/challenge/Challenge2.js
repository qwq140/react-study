import {useState} from "react";
function getImageUrl(person, size = 's') {
    return (
        'https://i.imgur.com/' +
        person.imageId +
        size +
        '.jpg'
    );
}

function Panel({ children }) {
    const [open, setOpen] = useState(true);
    return (
        <section className="panel">
            <button onClick={() => setOpen(!open)}>
                {open ? 'Collapse' : 'Expand'}
            </button>
            {open && children}
        </section>
    );
}


/**
 * 챌린지 2 of 3: 망가진 프로필을 고쳐보세요
 *
 * 두 개의 Profile 컴포넌트 서로 다른 데이터로 나란히 렌더링됩니다.
 * 첫 번째 프로필에서 “Collapse”를 누른 다음 “Expand”를 누릅니다.
 * 이제 두 프로필에 동일한 사람이 표시됩니다. 이것은 버그입니다.
 *
 * 버그의 원인을 찾아서 고치세요.
 *
 * 원인
 * 전역 변수인 currentPerson를 Profile 컴포넌트가 수정하고 Header, Avatar 컴포넌트가 읽는다.
 *
 * 해결
 * currentPerson를 지우고 프로퍼티로 넘긴다.
 */
function Profile({ person }) {
    return (
        <Panel>
            <Header person = {person}/>
            <Avatar person = {person}/>
        </Panel>
    )
}

function Header({person}) {
    return <h1>{person.name}</h1>;
}

function Avatar({person}) {
    return (
        <img
            className="avatar"
            src={getImageUrl(person)}
            alt={person.name}
            width={50}
            height={50}
        />
    );
}

export function App() {
    return (
        <>
            <Profile person={{
                imageId: 'lrWQx8l',
                name: 'Subrahmanyan Chandrasekhar',
            }} />
            <Profile person={{
                imageId: 'MK3eW3A',
                name: 'Creola Katherine Johnson',
            }} />
        </>
    )
}