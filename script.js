
function Cell(){
    let value = null;
    
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

    const insertToken = (playerToken, row, col) => {

        // if row and col are out of bounds or the index is already storing a token, return
        if(row < 0 || row >= rows || col < 0 || col >= cols || board[row][col].getToken() !== null){
            return;
        }

        board[row][col].setToken(playerToken);

    }


    return {
        getBoard,
        printBoard,
        insertToken,
    };

}



function GameController( playerOne = "Player One", playerTwo = "Player Two"){
    
    const gameBoard = Gameboard();
    const players = [
        {
            name: playerOne,
            token: 'X',
        },
        {
            name: playerTwo,
            token: 'O',
        }
    ];

    let activePlayer = players[0];



}




const game = GameController();