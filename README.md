
# Unit 1 Project -- Card Match
### Project Summary
A simple, 2 player game where players have to match 2 cards to collect points (i.e. a successful pick of matching cards provides 1 point).
The person with the most points at the end of the round wins the game. 

### Technology Used
* jQuery
* jQueryUI
* HTML/CSS/Flexbox

### Wireframe
![mockup](/mockup.png)

### Code Organization
##### Global variables
* Variables to capture game state such as `playerTurn` to track which player turn it is, `roundDone` to check if the current round of play is done, etc.
* Global array `cardArr` which houses all cards to be used in the game

##### Event Handlers
* Handlers to open/close the modal, which houses game instructions
* Handler for each card, so they can be clicked on to show card values

##### Functions
* `const generateCards()` -- add cards to the DOM, add classes which will be used to capture card info, CSS styling
* `const shuffleDeck()` -- uses Durstenfeld's version of the Fisher-Yates shuffle algorithm.  Random number is generated, which will be used to randomly pick a location in the card array.  A loop goes through, counting down, that will swap a random part of the array with each place in the loop.  
* `const playMatch()` -- holds the logic that determines what happens once a card is clicked on.  It captures up to 2 clicks in a turn.  Simultaneously, it adds and removes classes to allow CSS to 'show' and 'hide' cards, as well as preventing shown cards from being clicked on multiple times.
* `const checkRound()` -- once two cards are played, check the values and see if the cards are a match or not.  If there's a match, change the class so the cards are no longer clickable nor are they hidden.  If there is no match, the cards will re-hide themselves. Player turn is also controlled here.  Current player will go again if there's a match, else the turn goes to the next player if there is no match.
* `const endMatch()` -- checks scores to see who won, after all cards are played.  Gives the option to play again, or quit entirely. 

### Challenges, Limitations, and Future Updates
* Right now, the card gameboard is static - there are only 20 cards available, and the cards generated are static.  Ideally, the player should be able to choose the number of cards to generate.  Also, full decks with every suit should be available.  Only a subset of hearts and spades are available at the moment.
* While I did use flexbox to generate the card layout, I don't seem to have as much control with card spacing as I would like.  There's probably some additional CSS tricks I'm missing here!
* Would like to animate the card flipping, would make it a little more realistic.
* Also would like to have better designed cards, make it more realistic to a actual playing card. Additional animations or visual guides to notate who's turn it is, for example, would be helpful as well. 
* Code may need to be refactored for slight visual bug; when game is almost complete, last matching pair doesn't dim and the final score until prompts to continue are completed. 
* Cards are still clickable during delay of a non-matched set.  They should not be.

