import React from 'react';
import styled from "styled-components";
import {Button} from "react-bootstrap";

const StyledDeleteButton = styled.button`
  color: ${(props) => (props.user.username === 'ssar' ? 'blue' : 'red')};
`;

const StyledAddButton = styled(StyledDeleteButton)`
  background-color: green;
`;

// Function 방식
const Home = (props) => {

    // 넘겨준 키값이랑 같아야함
    // 구조분할 할당
    const {boards, setBoards, number, setNumber, user} = props;

    return (
        <div>
            <Button variant="primary">Primary</Button>
            <h1>홈 : {number}</h1>
            <StyledAddButton user={user} onClick={() => setNumber(number + 1)}>번호증가</StyledAddButton>
            <StyledDeleteButton user={user} onClick={() => setBoards([])}>전체삭제</StyledDeleteButton>
            {boards.map((board) => (<h3 key={board.id}>제목 : {board.title} 내용 : {board.content}</h3>))}
        </div>
    );
};

export default Home;