

$(() => {
    //////////////////////
    // GLOBAL VARIABLES //
    //////////////////////
    let firstClick = null; // capture class of first on Click
    let clickCheck = null; // check to see if 2 clicks captured
    let secondClick = null; // capture class of second click
    let playerOneScore = 0; // keep score for the 1st player
    let playerTwoScore = 0; // keep score for the 2nd player
    let playerTurn = 1; // keep track of who's turn it is
    let roundDone = null; // flag to track if the current turn is done
    let clickTarget1 = null;  // capture the target of a click in a variable
    let clickTarget2 = null; // capture the target of a click in a variable
    let matchCounter = 10; // count and track how many matches are available in the deck

    // array of cards to use
    const cardArr = [
        {
            suit: "hearts",
            name: "ace",
            value: 1,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "two",
            value: 2,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "three",
            value: 3,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "four",
            value: 4,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "five",
            value: 5,
            symbol: "♥"
        },
        {
            suit: "spades",
            name: "six",
            value: 6,
            symbol: "♠"
        },
        {
            suit: "spades",
            name: "seven",
            value: 7,
            symbol: "♠"
        },
        {
            suit: "spades",
            name: "eight",
            value: 8,
            symbol: "♠"
        },
        {
            suit: "spades",
            name: "nine",
            value: 9,
            symbol: "♠"
        },
        {
            suit: "spades",
            name: "ten",
            value: 10,
            symbol: "♠"
        }
    ];

    // create a new array that is the original card array x2
    const newDeck = [...cardArr, ...cardArr];
   
    // cached dom elements
    const gameBoard = $('.gameboard');
    // Grabbing About the Game button
    const $openBtn = $('#openModal');
    // Grabbing modal element
    const $modal = $('#modal');
    // Grabbing close button
    const $closeBtn = $('#close');

    
    // Event handler to open the modal
    const openModal = () => {
        $modal.css('display', 'block');
    }
    // Event handler to close the modal
    const closeModal = () => {
        $modal.css('display', 'none');
    }
    //Add event listener to Close button
    $closeBtn.on('click', closeModal);
    //Add event listener to About the Game button
    $openBtn.on('click', openModal);

    ///////////////
    // FUNCTIONS //
    ///////////////
    const generateCards = () => {

        $('.currPlayer').append().text(`Current Player: ${playerTurn}`);
        $('.matchesLeft').append().text(`Matches left: ${matchCounter}`);

        // generate 20 cards
        for (let i=0; i<20; i++){
            
            // create a card variable
            const $card = $('<div>').addClass(`grid card location${[i]}`);

            // append the card to the gameboard div
            $(gameBoard).append($card);
        } // end of card generation
    } // end of generateCards()

    // function to shuffle the deck array
    const shuffleDeck = () => {
        
        // Durstenfeld's version of the Fisher-Yates shuffle algorithm
        // https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
        for (let i = newDeck.length-1; i >= 0; i--){

            let scratchNum = 0;
            let resultNum = 0;

            let rollNum = (Math.floor(Math.random() * i));

            // swap out newDeck index with random place in array
            resultNum = newDeck[rollNum];
            scratchNum = newDeck[i];
            newDeck[rollNum] = scratchNum;
            newDeck[i] = resultNum;

            // jQuery render card values - front of card
            let placeholder = `location${i}`;
            $(`.${placeholder}`).append(`<div class="frontCard ${newDeck[i].name} ${newDeck[i].suit} ">`);
            $(`.${placeholder}`).children().append(`<p>${newDeck[i].value}</p>`);
            $(`.${placeholder}`).children().append(`<p>${newDeck[i].symbol}</p>`);
            $(`.${placeholder}`).children().addClass('hideCard');
            $(`.${placeholder}`).append('<div class="backCard">');


        } // end for loop
    } // end shuffleDeck()

    // function to create onClick event to play the game
    const playMatch = () => {

        // create onClick event on each .card
        $('.card').on('click', (event) => {
            
            // stop page from reloading
            event.preventDefault();

            // split out the classes and set to value var
            let $value = $(event.currentTarget).children().attr("class").split(' ');
            
            // logic to check if you are in turn 1 or turn 2
            if (clickCheck === true){ 
                // checkForSecondClick = $(event.currentTarget).addClass('clicked')
                $(event.currentTarget).addClass('noMoreClicks')
                $(event.currentTarget).children(1).removeClass('hideCard')
                clickTarget1 = $(event.currentTarget)
                secondClick = $value[1];
                roundDone = true;
            }else {
                // checkForFirstClick =$(event.currentTarget).addClass('clicked')
                $(event.currentTarget).addClass('noMoreClicks')
                $(event.currentTarget).children(1).removeClass('hideCard')
                clickTarget2 = $(event.currentTarget)
                firstClick = $value[1];            
                clickCheck = true;
            }
            // make sure to only capture 2 clicks.  Otherwise 3rd click should be "first" click.
            if (firstClick !== null && secondClick !==null){
                checkRound();
                firstClick = null;
                secondClick = null;
                clickCheck = false;
            } // end of if clickCheck
        }) // end of on click
    } // end of playMatch

    const checkRound = () => {

        if (roundDone === true) {
            if (firstClick === secondClick){
 
                console.log("you have a match!")

                $('.noMoreClicks').addClass('match')
                if (playerTurn === 1){
                    
                    playerOneScore++
                    console.log('playerOne ' + playerOneScore);
                    $('.p1Score').empty().append(`Score: ${playerOneScore}`)
                } else {

                    playerTwoScore++
                    console.log('playerTwo ' + playerTwoScore);
                    $('.p2Score').empty().append(`Score: ${playerTwoScore}`)
                }
                matchCounter--; // Matches left 
                $('.matchesLeft').append().text(`Matches left: ${matchCounter}`);

                if (matchCounter === 0) {
                    endMatch();
                }
                console.log(matchCounter);
            } else {
                // $('.clicked').removeClass('clicked')

                console.log("No match, next player turn")

                if (playerTurn === 1){
                    playerTurn = 2;
                    $('.currPlayer').append().text(`Current Player: ${playerTurn}`);
                } else {
                    playerTurn = 1;
                    $('.currPlayer').append().text(`Current Player: ${playerTurn}`);
                }

                setTimeout( () => {
                    $(clickTarget1).find('.frontCard').addClass('hideCard')
                    $(clickTarget2).find('.frontCard').addClass('hideCard')
                }, 2000)
                
            }
        $('.card').removeClass('noMoreClicks')
        } // end if for roundDone
    } // end checkRound()

    const endMatch = () => {
        // check to see who has the highest score
        if (playerOneScore > playerTwoScore){
            alert ("Player One Wins!");
        } else if (playerOneScore < playerTwoScore){
            alert ("Player Two Wins!");
        } else {
            alert ("It's a TIE!");
        }
        // prompt to start game again or quit
        let playAgain = prompt("Want to play again?", "Y/N")
        if (playAgain === "Y" || playAgain === "y") {
            location.reload(true);
        } else {
            return;
        } // end if statement
    } // end endMatch()


// end of functions

//////////////////////////////////
// FUNCTION CALLS TO START GAME //
//////////////////////////////////

// jQuery draw cards
generateCards();

// randomize deck (2x)
shuffleDeck();

// play the game
playMatch();

}) // end of jQuery onLoad
