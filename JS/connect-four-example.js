// gameboard 
/*The gameboard represents the state of the board
 Each square holds a cell 
 and we expose a dropToken method to be able to add cells to squares


 /**
  * 
  * This is a JavaScript function that creates a game board for a game.
  *  The game board is represented as a 2D array with 6 rows and 7 columns.
  *  The function initializes the board with empty cells using the Cell() function. 
  * The getBoard method returns the entire board for rendering by the UI.
  *  The dropToken method takes a column and player number as arguments and drops a token into
  *  the specified column for the specified player. It does this by finding the lowest available
  *  cell in the column and changing its value to the player number. If no cells are available in the column,
  *  the move is invalid and execution stops.

Is there anything else you would like to know about this function?
  */

function Gameboard(){
    const rows = 6;
    const columns = 7;
    const board = [];

    /*
     create a 2d array that will represent the state of the game board 
     for this 2d array ,row 0 will represent the top row and column 0 will 
     represent the left-most column. 
     // this nested-loop technique is a simple and common way to create a 2d array.
    */

     for(let i = 0;i < rows; i++){
        board[i] = [];
        for(let j =0;j < columns; j++){
            board[i].push(Cell());
        }
     }

     // this will be the method of getting the entire board that our 
     // UI will render 
     const getBoard = () => board;

     // in order to drop a token, we need to find what the lowest point of the 
     // selected column is , *then* change that cell's value to the player number.
    
     const dropToken = (column,player) =>{
        // our board's outermost array represents the row,
        // so we need to loop through the rows, starting at row 0,
        // find all the rows that don't have a token , then take the 
        // last one ,which will represent the bottom-most empty cell
        const availableCells = board.filter((row) => row[column].getValue() === 0).map(row=>row[column]);

        // if no cells make it through the filter,
        // the move is invalid. Stop execution.
        if(!availableCells.length)return;

         /**
         The dropToken method takes two arguments: column and player. 
        The column argument specifies the column in which the player wants to drop their token. 
        The player argument specifies the player number.

        The method first creates an array of available cells in the specified column by filtering the rows of 
        the board to only include rows where the value of the cell in the specified column is 0 (i.e., empty).
        It then maps these rows to their corresponding cells in the specified column.

        If there are no available cells (i.e., the column is full),
        the method returns without doing anything. Otherwise, it finds the lowest available cell by taking the 
        last cell in the array of available cells. It then changes the value of this cell to the player number
        using the addToken method.

        In summary, the dropToken method finds the lowest available cell in a specified column and changes its value
        to represent a token dropped by a specified player. If there are no available cells in the column, it does nothing. 
      */

        /*
            The availableCells variable is created using the filter and map methods of the board array. 
            The filter method is used to create a new array that includes only the rows of the board where the value of 
            the cell in the specified column is 0 (i.e., empty). This is done by passing a callback function to 
            the filter method that takes a row as an argument and returns true if the value of the cell in the specified
             column is 0 and false otherwise.

            The resulting array of rows is then passed to the map method, which creates a new array by applying a callback 
            function to each element of the input array. In this case, the callback function takes a row as an argument and
             returns the cell in the specified column of that row.

            The result is an array of available cells in the specified column, which is assigned to the availableCells variable.

        */

        //otherwise , I have a valid cell, the last one in the filtered array
        const lowestRow = availableCells.length -1;
        board[lowestRow][column].addToken(player);

     };

     //this method will  be used to print our board to the console 
     // It is hepful to see what the board looks like after each turn as we play, 
     // but we won't need it after we build our UI

     const printBoard = () =>{
        const boardWithCellValues = board.map((row)=> row.map((cell)=> cell.getValue()))
        console.log(boardWithCellValues);
     };

     // Here, we provide an interface for the rest of our 
     //application to interact with the board.

     return{getBoard,dropToken,printBoard};
}


/*
* A cell represents one "Square" on the board and can have one of 
0: no token is in the square, 
1: Player One's token, 
2: player 2's token */

function Cell(){
    let value = 0;

    // Accept a player's token to change the value of the cell
    const addToken = (player)=>{
        value = player;
    };

    // how we will retrieve the current value of this cell through closure 

const getValue = ()=> value;

return{
    addToken,
    getValue
};
}

// The gameController will be responsible for controlling the 
//flow and state of the game's turns, as well as whether 
// anybody has won the game

function gameController(
    playerOneName = "Player One",
    PlayerTwoName = "Player Two"
){
    const board = Gameboard();
    const players = [
        {
            name:playerOneName,
            token:1
        },
        {
            name:PlayerTwoName,
            token:2
        },
    ];

    let activePlayer = players[0];

    const switchPlayerTurn =() =>{
        activePlayer = activePlayer === players[0] ? players[1] : players[0]
    };

    const getActivePlayer =() => activePlayer;
    const printNewRound =() =>{
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (column)=>{
        // drop a token for the current player
        console.log(
            `Dropping ${getActivePlayer().name}'s token into column ${column}...`
        );
        board.dropToken(column,getActivePlayer().token);

        // this is where we check for a winner and handle the logic 
        // with a win message.

        // Switch player turn 
        switchPlayerTurn();
        printNewRound();

    };

    printNewRound();

    // for the console version , we will only use PlayRound, but we will need 
    //getActivePlater for the UI version  so I will show it here,
    
    return{
        playRound,
        getActivePlayer
    };

}

const game = gameController();



