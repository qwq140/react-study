import {useState} from "react";
import {useTodoDispatch, useTodoNextId} from "../contexts/TodoContext";

export function TodoInput({todos, handleTodos}) {

    const [inputValue, setInputValue] = useState("");


    const nextId = useTodoNextId();
    const dispatch = useTodoDispatch();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleAddTodo = () => {
        if(inputValue.trim()) {
            dispatch({
               type : 'CREATE',
               todo : {
                   id : nextId.current,
                   text : inputValue,
                   isDone : false,
               }
            });
            setInputValue('');
            nextId.current += 1;
        }
    }

    return (
      <div className={"input-container"}>
          <input type={"text"} placeholder={"할일을 입력해주세요..."} value={inputValue} onChange={handleInputChange}/>
          <button onClick={handleAddTodo}>입력</button>
      </div>
    );
}