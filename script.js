
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

    const clearBoard = () => {

        console.log("Clearing Board....");

        for(let i = 0; i < rows; i++){
            board[i] = [];
    
            for(let j = 0; j < cols; j++){
                board[i].push(Cell())
            }
            
        }
    }

    return {
        getBoard,
        printBoard,
        insertToken,
        clearBoard,
    };

}



function GameController(playerOne = "Player 1", playerTwo = "Player 2"){
    
    const gameBoard = Gameboard();

    //gameState is true while neither player has won
    let gameState = true;
    let winner = null;
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

    const startGame = () => {
        gameBoard.clearBoard();
        printActivePlayer();
    }

    const restartGame = () => {
        if(winner){
            activePlayer = winner;
        }
        winner = null;
        gameState = true;
        startGame();
    }


    const getWinner = () => {
        return winner;
    }

    const getGameState = () => {
        return gameState;
    }


    const playRound = (row, col) => {

        if(gameState){
            gameBoard.insertToken(activePlayer.token, row, col);
            gameBoard.printBoard();

            const gameWinner = checkForWinner();
            
            if(gameWinner){
                winner = gameWinner;
                gameState = false;
            } else{
                switchActivePlayer();
                printActivePlayer();
            }

        }
    }

    const checkForWinner = () => {

        for(let i = 0; i < players.length; i++){
            
            if(checkRows(players[i].token) || checkColumns(players[i].token) || checkDiagonal(players[i].token)){
                console.log(`${players[i].name} Wins!`);
                return players[i];
            }
        }

        return null;
    }


    // returns true if active player has a winning row
    const checkRows = (player) => {
        
        const board = gameBoard.getBoard();

        let rowsResult = board.map((row) => 
            row.every((cell) => cell.getToken() === player))
        
        return rowsResult.some(result => result === true);
    }

    // returns true if active player has a winning column
    const checkColumns = (player) => {

        const board = gameBoard.getBoard();

        let result = false;
        for(let colIndex = 0; colIndex < board.length; colIndex++){
            let col = board.map((row) => row[colIndex]);
            if(col.every((cell) => cell.getToken() === player)){
                result = true;
            }
        }

        return result;
    }

    // returns true if active player has a winning diagonal
    const checkDiagonal = (player) => {

        const board = gameBoard.getBoard();

        // check every cell in diagonal starting from the left
        let left = 0;
        let leftDiagonal = board.map(row => row[left++]).every(cell => cell.getToken() === player);
        
        // check every cell in diagonal starting from the right
        let right = board.length - 1;
        let rightDiagonal = board.map(row => row[right--]).every(cell => cell.getToken() === player);
        
        return leftDiagonal || rightDiagonal;


    }
    

    return {
        startGame,
        restartGame,
        getActivePlayer,
        playRound,
        getWinner,
        getGameState,
        getBoard: gameBoard.getBoard,
    }

}


function ScreenController(){

    const gameController = GameController();
    const playerTurnDiv = document.querySelector(".turn");
    const resultDiv = document.querySelector(".result");
    const boardDiv = document.querySelector(".board");
    const restartButton = document.querySelector(".restart-button");

    const updateScreen = () => {

        boardDiv.textContent = "";

        const player = gameController.getActivePlayer();
        const board = gameController.getBoard();

        playerTurnDiv.textContent = `${player.name}'s Turn. Place an ${player.token}`;

        

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) =>{
                let cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.column = colIndex;
                cellButton.dataset.row = rowIndex;
                cellButton.textContent = cell.getToken();

                boardDiv.appendChild(cellButton);
            })
        })

        if(!gameController.getGameState()){
            const gameWinner = gameController.getWinner();
            resultDiv.textContent = `${gameWinner.name} Wins!`;
        }


    }

    function clickHandlerBoard(e){
        const selectedRow = e.target.dataset.row;
        const selectedCol = e.target.dataset.column;

        if(!selectedRow || !selectedCol) return;

        gameController.playRound(selectedRow, selectedCol);
        
        updateScreen();

    }

    boardDiv.addEventListener("click", clickHandlerBoard);

    restartButton.addEventListener("click", () => {
        gameController.restartGame();
        resultDiv.textContent = "";
        updateScreen();
    });



    gameController.startGame();
    updateScreen();

}


ScreenController();










