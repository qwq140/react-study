import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";
import {Container, Nav, Navbar} from "react-bootstrap";

// 하나의 컴포넌트를 생성 (재사용)

// styled-components => js파일과 css파일 관리
const StyledHeaderDiv = styled.div`
  border: 1px solid black;
  height: 300px;
  background-color: ${(props) => props.backgroundColor};
`;

const StyledHeadLink = styled(Link)`
  color: red;
`;

const Header = () => {
    return (
        <div>
            <StyledHeaderDiv backgroundColor="blue">
                <ul>
                    <li><StyledHeadLink to="/">홈</StyledHeadLink></li>
                    <li><StyledHeadLink to="/login/10">로그인</StyledHeadLink></li>
                </ul>
            </StyledHeaderDiv>
        </div>
    );
};

export default Header;