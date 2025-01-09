


function Cell(){
    value = null;
    
    const setToken = (token) => {
        value = token;
    }


    const getToken = () => value;

    return {
        setToken,
        getToken,
    };

}



function Gameboard(){
    let rows = 3;
    let cols = 3;
    let board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j = 0; j < cols; j++){
            board[i].push(Cell())
        }
        
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getToken()));
        console.log(boardWithCellValues);
    }

    return {
        getBoard,
        printBoard,
    };

}


let gameBoard = Gameboard();

gameBoard.printBoard();