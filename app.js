

$(() => {

    // global vars

    let firstClick = null; // capture class of first on Click
    let clickCheck = null; // check to see if 2 clicks captured
    let secondClick = null; // capture class of second click
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let playerTurn = 0;
    let roundDone = null;
    let checkForFirstClick = null;
    let checkForSecondClick = null;

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
                secondClick = $value[1];
                roundDone = true;
            }else {
                // checkForFirstClick =$(event.currentTarget).addClass('clicked')
                $(event.currentTarget).addClass('noMoreClicks')
                firstClick = $value[1];            
                clickCheck = true;
            }

            console.log(firstClick);
            console.log(secondClick);


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
                    $('.p2Score').empty().append(`Score: ${playerOneScore}`)
                }
            } else {
                // $('.clicked').removeClass('clicked')
                console.log("No match, next player turn")
                if (playerTurn === 1){
                    playerTurn = 2;
                } else {
                    playerTurn = 1;
                }
            }
        $('.card').removeClass('noMoreClicks')
        // $('.card').removeClass('clicked')
        }

    }


// end of functions

    // jQuery draw cards
    generateCards();

    // randomize deck (2x)
    shuffleDeck();
    //shuffleDeckSecond();

    playerTurn = 1;
    playMatch();





}) // end of jQuery onLoad





// generate 10-card board
    // grid board
    // make each area clickable
    // randomly place cards on table
    // display cards before game starts
    // hide all cards when game starts

// player 1 
    // click a card to reveal
    // remember this card
    // click a second card to reveal
        // if matches, add a point, repeat
        // if not, go to player two


// player 2
    // do the same as player 1

// win condition
    // highest number of points

