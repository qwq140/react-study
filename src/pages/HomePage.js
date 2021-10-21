import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/home/Home";

const HomePage = () => {

    // http 요청 (fetch, axios(다운)) : 데이터 다운로드는 컴포넌트에서 하는 것이 아닌 페이지에서 하기 => 해당 컴포넌트를 사용하는 다른 페이지에서 그 데이터를 사용하지 않을 수 있기 때문에
    const [boards, setBoards] =useState([]);
    const [number, setNumber] = useState(0);
    const [user, setUser] = useState({});

    // 빈 배열 한번만 실행, 어디에도 의존하고 있지 않기 때문에
    useEffect(()=>{
        //다운로드 가정 = fetch(), axios()
        let data = [
            {id:1, title:"제목1", content:"내용1"},
            {id:2, title:"제목2", content:"내용2"},
            {id:3, title:"제목3", content:"내용3"},
        ];

        // fetch(), axios() 비동기이기 때문에 다운로드 되기전에 setBoards가 실행되어 빈데이터가 들어간다.
        // 다운로드가 완료되면 콜백되어 다시 들어가서 랜더링이 다시 된다.
        // 데이터를 넘길때는 상태값을 넘기기
        setBoards([...data]);
        setUser({id:1, username: 'ssar'});
    },[])

    return (
        <div>
            <Home boards={boards} setBoards={setBoards} number={number} setNumber={setNumber} user={user}/>
        </div>
    );
};

export default HomePage;