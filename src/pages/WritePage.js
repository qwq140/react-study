import React from 'react';

const handleWrite = () =>{
    // ListPage의 setPosts에 데이터 담기
    let post = {id:6,title:"인풋값"};
}

const WritePage = () => {
    return (
        <div>
            <h1>글쓰기 페이지입니다.</h1>
            <hr/>
            <form>
                <input type="text" placeholder="제목을 입력하세요..."/>
                <button type="button" onClick={handleWrite}>글작성</button>
            </form>
        </div>
    );
};

export default WritePage;