import {useState} from "react";

export function MyButton({count, onClick}) {
    // const [count, setCount] = useState(0);

    // function handleClick() {
    //     setCount(count+1);
    // }

    return (
        <button onClick={onClick}>Clicked {count} times</button>
    );
}