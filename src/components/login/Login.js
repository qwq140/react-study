import React from 'react';
import styled from "styled-components";

const StyledLoginBoxDiv = styled.div`
  padding: 30px 0 30px 0;
`;

const Login = () => {
    return (
        <StyledLoginBoxDiv>
            <h1>로그인 페이지입니다.</h1>
        </StyledLoginBoxDiv>
    );
};

export default Login;