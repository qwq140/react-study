import "./App.css";
import {useState} from "react";
import {Board} from "./components/Board";

export default function Game() {
    // const [xIsNext , setXIsNext] = useState(true);
    // 이동 기록을 추적하기 위한 state
    const [history, setHistory] = useState([Array(9).fill(null)]);
    // 현재 바라보고 있는 단계 state
    const [currentMove, setCurrentMove] = useState(0);
    // currentMove가 짝수일 때는 X의 차례 홀수일 때는 O의 차례
    // 즉 currentMove의 값을 알고 있으면 xIsNext의 값을 알 수 있다.
    // xIsNext를 state로 관리할 필요가 없다.
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    // Board 컴포넌트가 업데이트할 때 호출할 함수
    function handlePlay(nextSquares) {
        // 이전 history로 이동해서 새롭게 게임을 진행하는 경우 해당 시점까지의 히스토리를 유지해야한다.
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        // 최신 히스토리를 가리키도록 currentMove 업데이트
        setCurrentMove(nextHistory.length-1);
        // setXIsNext(!xIsNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // X의 차례 : 0, 2, 4, 6
        // setXIsNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if(move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = 'Go to game start';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div className={"game"}>
            <div className={"game-board"}>
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className={"game-info"}>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}


