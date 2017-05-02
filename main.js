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
function askQuestion(cardCount) {
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
			// Increase cardCount and use recursion to ask next question
			cardCount++;
			askQuestion(cardCount);
		})
	}
	else if (cardCount < basicCardsArray.length + clozeCardsArray.length) {
		inquirer.prompt([
			{
				name: "card",
				message: cardsArray[cardCount].partial
			}
		]).then(function(answer) {
			if (answer.card.toLowerCase() === cardsArray[cardCount].cloze.toLowerCase()) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. The correct answer was " + cardsArray[cardCount].cloze);
			}
			// Increase cardCount and use recursion to ask next question
			cardCount++;
			askQuestion(cardCount);
		});
	}
	// Use inquirer to ask the user if they would like to add a card. If the user confirms then
	// they need to choose the card type and the appropriate function will be executed
	else {
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "You have completed the flashcards. Would you like to add your own for next time?"
			}
		]).then(function(answer) {
			if (answer.confirm === true) {
				inquirer.prompt([
					{
						name: "cardType",
						type: "list",
						message: "Would type of cards would you like to add?",
						choices: ["basic", "cloze"]		
					}
				]).then(function(answer) {
					if (answer.cardType === "basic") {
						addBasicCard(0);
					}
					else {
						addClozeCard(0);
					}
				});
			}
			else {
				console.log("Thanks for playing. Come back again soon!");
			}
		});
	}
}

function addBasicCard(cardCount) {
	if (cardCount < 3) {
		cardCount++
		console.log("***New Card #" + cardCount + "***");
		inquirer.prompt([
			{
				name: "front",
				message: "Please enter a new question:"
			},
			{
				name: "back",
				message: "Please enter the answer to the question:"
			}
		]).then(function(answers) {
			var card = new BasicCard(answers.front, answers.back);
			basicCardsArray.push(card);
			cardsArray.push(card);
			console.log("Card added succesfully!");
			// Execute function with new cardCount in order to begin recursive looop
			addBasicCard(cardCount);
		});
	}
	else {
		console.log("All three cards have been added!");
		askQuestion(0);
	}
}

function addClozeCard(cardCount) {
	if (cardCount < 3) {
		cardCount++
		console.log("***New Card #" + cardCount + "***");
		inquirer.prompt([
			{
				name: "text",
				message: "Please enter the full text of the card:"
			},
			{
				name: "cloze",
				message: "Please enter the cloze portion of the card:"
			}
		]).then(function(answers) {
			var card = new ClozeCard(answers.text, answers.cloze);
			clozeCardsArray.push(card);
			cardsArray.push(card);
			console.log("Card added succesfully!");
			// Execute function with new cardCount in order to begin recursive looop
			addClozeCard(cardCount);
		});
	}
	else {
		console.log("All three cards have been added!");
		askQuestion(0);
	}
}

// Executing askQuestion with a cardCount of 0 in order to begin recursive loop
askQuestion(0);