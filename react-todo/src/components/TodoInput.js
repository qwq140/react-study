import {useState} from "react";

export function TodoInput({todos, handleTodos}) {

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleAddTodo = () => {
        if(inputValue.trim()){
            handleTodos([...todos, {
                id : todos.length === 0 ? 1 : todos[todos.length -1].id + 1,
                text : inputValue,
                isDone : false,
            }]);
            setInputValue('');
        }
    }

    return (
      <div className={"input-container"}>
          <input type={"text"} placeholder={"할일을 입력해주세요..."} value={inputValue} onChange={handleInputChange}/>
          <button onClick={handleAddTodo}>입력</button>
      </div>
    );
}