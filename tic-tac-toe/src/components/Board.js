import {Square} from "./Square";

export function Board({xIsNext, squares, onPlay}) {
    // 순서 정하는 상태
    // const [xIsNext, setXIsNext] = useState(true);

    // 보드 칸 상태
    // const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(i) {
        // 선택 불가능한 경우
        // 1. 선택된 칸을 선택했을 경우
        // 2. 승자가 결정된 경우
        if(squares[i] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = [...squares];
        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: "+ (xIsNext ? 'X' : 'O');
    }


    return (
        <>
            <div className={"status"}>{status}</div>
            <div className={"board-row"}>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className={"board-row"}>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className={"board-row"}>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>

        </>
    );
}

// 승자 결정하는 로직
function calculateWinner(squares){
    // 승리 하는 경우의 수 리스트
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    // 이길 수 있는 경우 loop
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // 승리조건 같은 줄의 값이 같을때 X또는 O
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}