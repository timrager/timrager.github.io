

$(() => {

    // global vars

    let firstClick = null; // capture class of first on Click
    let clickCheck = null; // check to see if 2 clicks captured
    let secondClick = null; // capture class of second click
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerTurn = 1;
    let roundDone = null;
    let clickTarget1 = null;
    let clickTarget2 = null;
    let matchCounter = 10;

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
            suit: "hearts",
            name: "six",
            value: 6,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "seven",
            value: 7,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "eight",
            value: 8,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "nine",
            value: 9,
            symbol: "♥"
        },
        {
            suit: "hearts",
            name: "ten",
            value: 10,
            symbol: "♥"
        }
    ];

    // create a new array that is the original card array x2
    const newDeck = [...cardArr, ...cardArr];
   
    // cached dom elements
    const gameBoard = $('.gameboard');

    const generateCards = () => {

        $('.currPlayer').append().text(`Current Player: ${playerTurn}`);
        $('.matchesLeft').append().text(`Matches left: ${matchCounter}`);

        // generate 20 cards
        for (let i=0; i<20; i++){
            
            // create a card variable
            const $card = $('<div>').addClass(`grid card location${[i]}`);

            // append the card to the gameboard div
            $(gameBoard).append($card);
        }
    }

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
            $(`.${placeholder}`).append(`<div class="frontCard ${newDeck[i].name}">`);
            $(`.${placeholder}`).children().append(`<p>${newDeck[i].value}</p>`);
            $(`.${placeholder}`).children().append(`<p>${newDeck[i].symbol}</p>`);
            $(`.${placeholder}`).children().addClass('hideCard');
            $(`.${placeholder}`).append('<div class="backCard">');


        } // end for loop
    } // end shuffleDeck()

    // const shuffleDeckSecond = () => {
        
    //     // Durstenfeld's version of the Fisher-Yates shuffle algorithm
    //     // https://en.wikipedia.org/wiki/Fisher–Yates_shuffle#The_modern_algorithm
    //     for (let i = cardArr.length-1; i >= 0; i--){

    //         let scratchNum = 0;
    //         let resultNum = 0;

    //         let rollNum = (Math.floor(Math.random() * i));
    //         // let rollNumSecondHalf = (Math.floor(Math.random() * i) + 10);

    //         // swap out cardArr index with random place in array
    //         resultNum = cardArr[rollNum];
    //         scratchNum = cardArr[i];
    //         cardArr[rollNum] = scratchNum;
    //         cardArr[i] = resultNum;

    //         // jQuery render card values
    //         let placeholder = `location${i+10}`;
    //         $(`.${placeholder}`).append(`<div class="frontCard ${cardArr[i].name}">`);
    //         $(`.${placeholder}`).children().append(`<p>${cardArr[i].value}</p>`);
    //         $(`.${placeholder}`).children().append(`<p>${cardArr[i].symbol}</p>`);
    //         $(`.${placeholder}`).append('<div class="backCard">');

    //     } // end for loop
        
    // } // end shuffleDeckSecond()

    const playMatch = () => {

        $('.card').on('click', (event) => {
            
            event.preventDefault();

            let $value = $(event.currentTarget).children().attr("class").split(' ');
            

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

            // console.log(firstClick);
            // console.log(secondClick);


            // make sure to only capture 2 clicks.  Otherwise 3rd click should be "first" click.
            if (firstClick !== null && secondClick !==null){
                checkRound();
                firstClick = null;
                secondClick = null;
                clickCheck = false;
            }

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

        }

    }

    const endMatch = () => {
        let playAgain = prompt("Want to play again?", "Y/N")
        if (playAgain === "Y" || playAgain === "y") {
            location.reload(true);
        } else {
            return;
        }
    }


// end of functions

    // jQuery draw cards
    generateCards();

    // randomize deck (2x)
    shuffleDeck();
    //shuffleDeckSecond();

    playMatch();


    // $('.beginGame').on('click', () => {
    //     console.log('go');
    //     playMatch();
    // });
    






}) // end of jQuery onLoad





// Game must have:

// Must be a two player game (either against the computer or against another player)
// Example: Blackjack: A player plays against the dealer. The dealer is the computer
// Example: Connect Four: Two players pass the game between themselves to take turns

// A win state - a way for the player to win the game
// High score can be considered a win state 

// A lose state - a way for the player to lose the game
// Example: Blackjack - a player must be able to lose all of their money with losing hands and cannot play if their bankroll is at 0
// Example: Connect Four - the other player has won or there are no possible plays left

// A way to keep playing if the game is not over

// Multiple rounds to play - a round must begin, end, and there must be a way to check if the game should continue or the overall game is won or lost
// Example: Blackjack: a player takes turns playing a hand versus a computer - the player's hand can either win, lose or tie the dealer. If the player has enough money in their bankroll they can keep playing. A player must be able to win several rounds and increase their bankroll
// Example: Connect Four: two (non-computer) players take turns adding chips to the board. The game will check if a player won or if the board is full and there are no more plays possible. A player gets four chips in a row (vertically or horizontally)- one person wins, one loses, there are no further plays in this case
