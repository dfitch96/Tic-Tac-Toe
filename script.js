
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
        boardWithCellValues.forEach(row => console.log(row));
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



function GameController(playerOne = "Player 1", playerTwo = "Player 2"){
    
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
    
    const getActivePlayer = () => activePlayer;

    const switchActivePlayer = () => activePlayer = players[0] === activePlayer ? players[1] : players[0];

    const printActivePlayer = () => {
        console.log(`${getActivePlayer().name}'s turn`);
    }


    const playRound = (row, col) => {

        printActivePlayer();
        gameBoard.insertToken(activePlayer.token, row, col);
        checkForWinner();
        switchActivePlayer();
        gameBoard.printBoard();
    }

    const checkForWinner = () => {

        if(checkRows() || checkColumns()){
             console.log(`${getActivePlayer().name} Wins!`);
        }
     }

    const checkRows = () => {
        const currentPlayerToken = getActivePlayer().token;
        const board = gameBoard.getBoard();

        let rowsResult = board.map((row) => 
            row.every((cell) => cell.getToken() === currentPlayerToken))
        
        return rowsResult.some(result => result === true);
    }

    const checkColumns = () => {

        const currentPlayerToken = getActivePlayer().token;
        const board = gameBoard.getBoard();

        let result = false;
        for(let colIndex = 0; colIndex < board.length; colIndex++){
            let col = board.map((row) => row[colIndex]);
            if(col.every((cell) => cell.getToken() === currentPlayerToken)){
                result = true;
            }
        }

        return result;
    }

    

    return {
        getActivePlayer,
        switchActivePlayer,
        playRound,
        checkForWinner,
    }

}




const game = GameController();

game.playRound(0, 0);
game.playRound(1, 1);
game.playRound(1, 0);
game.playRound(2, 2);
game.playRound(2, 0);


