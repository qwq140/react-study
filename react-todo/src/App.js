import logo from './logo.svg';
import './App.css';
import {TodoBody} from "./components/TodoBody";
import {TodoHeader} from "./components/TodoHeader";
import {TodoInput} from "./components/TodoInput";
import {TodoList} from "./components/TodoList";
import {TodoProvider} from "./contexts/TodoContext";

function App() {
  return (
      <TodoProvider>
        <TodoBody/>
      </TodoProvider>
  );
}

export default App;
