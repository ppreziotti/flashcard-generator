// Requiring the node inquirer package in order to intake user input
var inquirer = require("inquirer");
// Requiring the BasicCard module from basicCard.js
var BasicCard = require("./basicCard.js");
// Requiring the ClozeCard module from clozeCard.js
var ClozeCard = require("./clozeCard.js");

// Creating empty arrays for basic cards, cloze cards, and all of the cards combined
// Creating three types of each card and then pushing them to the appropriate arrays
var basicCardsArray = [];
var clozeCardsArray = [];
var cardsArray = [];

var card1 = new BasicCard("In what year did North Carolina become a state?", "1789");
var card2 = new BasicCard("In what year did the Wright Brothers first succesfully fly a plane in Kitty Hawk, NC?", "1903");
var card3 = new BasicCard("In what year did UNC win its first men's basketball national championship?", "1957");

var card4 = new ClozeCard("Charlotte is the largest city in North Carolina.", "Charlotte");
var card5 = new ClozeCard("The cardinal is the North Carolina state bird.", "cardinal");
var card6 = new ClozeCard("North Carolina's state nickname is the Tar Heel State.", "Tar Heel State");

basicCardsArray.push(card1, card2, card3)
clozeCardsArray.push(card4, card5, card6);
cardsArray.push(card1, card2, card3, card4, card5, card6);

// Runs through the flashcards for the user using recursion, basic cards first
// followed by cloze cards
// Uses inquirer to ask the questions and take in user answers/determine correctness
function askQuestions(cardCount) {
	if (cardCount < basicCardsArray.length) {
		inquirer.prompt([
			{
				name: "card",
				message: cardsArray[cardCount].front
			}
		]).then(function(answer) {
			if (answer.card === cardsArray[cardCount].back) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. The correct answer was " + cardsArray[cardCount].back + ".");
			}
			cardCount++;
			askQuestions(cardCount);
		})
	}
	else if (cardCount < basicCardsArray.length + clozeCardsArray.length) {
		inquirer.prompt([
			{
				name: "card",
				message: cardsArray[cardCount].partial
			}
		]).then(function(answer) {
			if (answer.card === cardsArray[cardCount].cloze) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. The correct answer was " + cardsArray[cardCount].cloze);
			}
			cardCount++;
			askQuestions(cardCount);
		});
	}
	// Need to use inquirer for user to decided if they want to make cards and then run
	// through a function to create the new cards
	else {
		console.log("You have completed the questions. Would you like to add your own for next time?");
	}
}

// Executing askQuestions with a cardCount of 0 in order to begin recursive loop
askQuestions(0);