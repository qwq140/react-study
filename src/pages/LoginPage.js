import React from 'react';
import Header from "../components/Header";
import Login from "../components/login/Login";
import Footer from "../components/Footer";

const LoginPage = (props) => {
    const {history} = props
    console.log('LoginPage',props);
    return (
        <div>
            <button onClick={()=> history.push('/')}>뒤로가기</button>
            <Login/>
        </div>
    );
};

export default LoginPage;