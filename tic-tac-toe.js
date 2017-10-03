// GLOBALS
// init whosTurn as player 1s turn
var whosTurn = 1;
var numPlayers = 1
var name = "Contra";
var numPlayers = 1;
var player1Squares = [];
var player2Squares = [];
player1Img = '<img src="Y.png"/>';
player2Img = '<img src="X.png"/>';
var winningCombos = [
	['A1','B1','C1'], //ROW 1
	['A2','B2','C2'], //ROW 2
	['A3','B3','C3'], //ROW 3
	['A1','A2','A3'], //COLUMN 1
	['B1','B2','B3'], //COLUMN 2
	['C1','C2','C3'], //COLUMN 3
	['A1','B2','C3'], //DIAG 1
	['A3','B2','C1'] //DIAG 2
];
var gameOver = false;
var scores = [
	0,
	0
]

// Two things happen when someone clicks.
// 1. We change the DOM (for the user).
// 2. We change the vars for JS.

var markSquare = function(squareClicked){
	// console.log(squareClicked.innerHTML);
	if(squareClicked.innerHTML !== '!'){
		document.getElementById('message').innerHTML = "Sorry, that square is taken."
	}else if(whosTurn === 1){
		squareClicked.innerHTML = player1Img;
		whosTurn = 2;
		player1Squares.push(squareClicked.id);
		console.log(player1Squares)
		document.getElementById('message').innerHTML = "It's O's turn"
		if(player1Squares.length >= 3){
			checkWin(player1Squares,1);
		}
		// if((numPlayers == 1) && (!gameOver)){
		// 	computerMove();
		// }
	}else{
		squareClicked.innerHTML = player2Img;
		whosTurn = 1;
		player2Squares.push(squareClicked.id);
		document.getElementById('message').innerHTML = "It's X's turn"
		if(player1Squares.length >= 3)
			checkWin(player2Squares,2);
	}
	// checkWin();
}

// function computerMove(){
// 	// find a random square
// 	// see if that square is empty
// 	// if it is, send it to square
// 	// if it's not, keep looking
// 	var sqaureFound = false;
// 	while(!sqaureFound){
// 		rand = Math.floor(Math.random() * 9);
// 		var isTaken = squares[rand].innerHTML;
// 		if(isTaken === '-'){
// 			squaresFound = true;
// 		}




// 		// console.log(takenSquares)
// 		// if(takenSquares.indexOf(squares[rand].id) == -1){
// 		// 	// square not taken. Take it.
// 		// 	sqaureFound = true;
// 		// }
// 	}
// 	markSquare(squares[rand]);
// }

function checkWin(currentPlayerSquares,whoJustMarked){
	// if(squares[0].innerHTML === 'X') and (squares[1].innerHTML === 'X') and (squares[2].innerHTML === 'X'){
	// 	win.		
	// }
	// OUTTER LOOP - check each winning combination
	for (let i = 0; i < winningCombos.length; i++){
		// Keep track of how many of THIS winning combo the player has
		var squareCount = 0;
		// INNER LOOP - check a square inside a winning comnbination
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j]
			if(currentPlayerSquares.indexOf(winningSquare) !== -1){
				// THE Square belongs to the player. We do not care where.
				squareCount++;
			}
		} //end of j loop (row/diag/column complete)
		// check to see if the squareCount === 3
		if(squareCount === 3){
			// move stuff to a function
			endGame(winningCombos[i], whoJustMarked);
			break;
		}
	}
}

function endGame(winningCombo,whoJustMarked){
	if(whoJustMarked === 1){
		var nameToShow = name;
		scores[0]++;
	}else{
		var nameToShow = 'Player2';
		scores[1]++;
	}
	// WINNER WINNER CHICKEN DINNER
	console.log(`${nameToShow} won the game`);
	document.getElementById('message').innerHTML = `Congrats to player ${nameToShow}!`
	gameOver = true;
	// Loop through the winning combo, and add a class.	
	for(let i = 0; i < winningCombo.length; i++){
		var theSquare = document.getElementById(winningCombo[i])
		console.dir(theSquare);
		theSquare.className += ' winning-square';
	}
	document.getElementById('reset-button').innerHTML ='<button id="reset" class="btn btn-lg btn-success">Reset Game</button>'
	var resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', reset);
	document.getElementsByClassName('player1-score')[0].innerHTML = scores[0];
	document.getElementsByClassName('player2-score')[0].innerHTML = scores[1];
}
function reset(){
	player1Squares = [];
	player2Squares = [];
	for(let i = 0; i < squares.length; i++){
		squares[i].innerHTML = '!';
		squares[i].className = 'square';
	}
	gameOver = false;
}
// console.log("Sanity check...")
// 1. Set up Board --- CHECK
// 2. User should be be able to click on a button. --- CHECK
// When that happens, the square should have that players mark (X or O)
// 3. If it's X turn, put an X in. If it's O's turn, put an O in.
// 4. 3 means we need to keep track of who's turn it is.
// When X goes, it becomes O's turn, when O goes it becomes X's turn.
// 5. Check to see if someone won the game. If so, congratulate them, otherwise do nothing.

// 6. Highlight the winning sqaures
// 7. Game must stop if someone won (i.e., can't keep clicking)

// squares is an array with 9 objects. Each object is the JS representation of the HTML tag.
var squares = document.getElementsByClassName('square');
// squares[0].innerHTML
// console.log(squares[0]);
// console.dir(squares[0]);

for (let i = 0; i < squares.length; i++){
	// console.log(squares[i]);
	// console.dir(squares[i]);
	// Now that we have each square individually (squares[i]), we will add a click listener to it
	// adding an eventlistener goes:
	// 1. What to listen to 
	// 2. addEventListener
	// 3. first arg: what event
	// 4. second arg: code to run if event happens
	squares[i].addEventListener('click', function(event){
		// console.log(this);
		// call the markSquare funciton and pass the square user clicked on.
		// Only call markSquare if gameOver === false
		// in JS, ! = not, !gameOver means not gameOver, or gameOver == false
		if(!gameOver){
			markSquare(this);
		}
	});
}

document.getElementById('one-player').addEventListener('click', function(event){
	gameOver = false;
	numPlayers = 1;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}
})
document.getElementById('one-player').addEventListener('click', function(event){
	gameOver = false;
	numPlayers = 2;
	var nameBox = document.getElementById('player-name');
	if(nameBox.value !== ""){
		name = nameBox.value
	}
})

// computerMove()

// function someoneClicked(event){
// 		// console.log(this);
// 		// call the markSquare funciton and pass the square user clicked on.
// 		// Only call markSquare if gameOver === false
// 		// in JS, ! = not, !gameOver means not gameOver, or gameOver == false
// 		if(!gameOver){
// 			markSquare(this);
// 		}
// 	}



