import React, {useState} from 'react';
import styled from "styled-components";


const StyledItemBoxDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid black;
  padding: 10px;
  height: 100px;
  margin: 20px;
  align-items: center;
`;

const ListPage = () => {

    const [posts, setPosts] = useState([
        {id: 1, title: "제목1", content: "내용1"},
        {id: 2, title: "제목2", content: "내용2"},
        {id: 3, title: "제목3", content: "내용3"},
        {id: 4, title: "제목4", content: "내용4"},
        {id: 5, title: "제목5", content: "내용5"},
    ]);

    const handleWrite=(e)=>{

    };

    return (
        <div>
            <h1>리스트 페이지</h1>
            <hr/>
            <form>
                <input type="text" placeholder="제목을 입력하세요..."/>
                <button type="button" onClick={handleWrite}>글작성</button>
            </form>
            {posts.map((post) => (<StyledItemBoxDiv><div>번호 : {post.id} 제목 : {post.title} 내용 : {post.content}</div> <button>삭제</button></StyledItemBoxDiv>))}
        </div>
    );
};

export default ListPage;