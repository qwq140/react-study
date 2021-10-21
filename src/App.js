import './App.css';
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Route} from "react-router-dom";
import Navigation from "./components/Navigation";
import ListPage from "./pages/ListPage";
import WritePage from "./pages/WritePage";

// 글쓰기, 글삭제, 글목록보

function App() {
    return (
        <div>
            <Navigation/>
            <Route path="/" exact={true} component={ListPage}/>
            <Route path="/write" exact={true} component={WritePage}/>
        </div>
    );
}

export default App;
