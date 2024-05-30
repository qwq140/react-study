import './App.css';
import {MyButton} from "./components/MyButton";
import {AboutPage} from "./components/AboutPage";
import {Profile} from "./components/Profile";
import {ShoppingList} from "./components/ShoppingList";
import {useState} from "react";

function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count+1);
    }


    return (
        <div>
            <h1>Welcome to my app</h1>
            <MyButton count={count} onClick={handleClick}/>
            <MyButton count={count} onClick={handleClick}/>
            <AboutPage/>
            <Profile/>
            <ShoppingList/>
        </div>
    );
}

export default App;
