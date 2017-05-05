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

var basicCard1 = new BasicCard("In what year did North Carolina become a state?", "1789");
var basicCard2 = new BasicCard("In what year did the Wright Brothers first succesfully fly a plane in Kitty Hawk, NC?", "1903");
var basicCard3 = new BasicCard("In what year did UNC win its first men's basketball national championship?", "1957");

var clozeCard1 = new ClozeCard("Charlotte is the largest city in North Carolina.", "Charlotte");
var clozeCard2 = new ClozeCard("The cardinal is the North Carolina state bird.", "cardinal");
var clozeCard3 = new ClozeCard("North Carolina's state nickname is the Tar Heel State.", "Tar Heel State");

clozeCardsArray.push(clozeCard1, clozeCard2, clozeCard3);
basicCardsArray.push(basicCard1, basicCard2, basicCard3);

// User picks the option of playing either the basic or cloze flashcards through inquirer
inquirer.prompt([
	{
		name: "cardType",
		type: "list",
		message: "Welcome! What type of flashcards would you like to go through?",
		choices: ["basic", "cloze"]		
	}
]).then(function(answer) {
	if (answer.cardType === "basic") {
		// Executing playBasic with a cardCount of 0 in order to begin recursive loop through 
		// basic flashcards
		playBasic(0);
	}
	else {
		// Executing playCloze with a cardCount of 0 in order to begin recursive loop through 
		// cloze flashcards
		playCloze(0);
	}
});

// Runs through the basic flashcards using recursion. User answers are are submitted
// through inquirer
function playBasic(cardCount) {
	if (cardCount < basicCardsArray.length) {
		inquirer.prompt([
			{
				name: "card",
				message: basicCardsArray[cardCount].front
			}
		]).then(function(answer) {
			if (answer.card === basicCardsArray[cardCount].back) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. The correct answer was " + basicCardsArray[cardCount].back + ".");
			}
			// Increase cardCount and use recursion to play next card
			cardCount++;
			playBasic(cardCount);
		});
	}
	// Uses inquirer to ask the user if they would like to add their own cards
	// Runs the addBasicCard function if the user confirms
	else {
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "You have completed the flashcards. Would you like to add your own for next time?"
			}
		]).then(function(answer) {
			if (answer.confirm === true) {
				addBasicCard(0);
			}
			else {
				console.log("Thanks for playing! Come back again soon.");
			}
		});
	}
}

// Runs through the cloze flashcards using recursion. User answers are are submitted
// through inquirer
function playCloze(cardCount) {
	if (cardCount < clozeCardsArray.length) {
		inquirer.prompt([
			{
				name: "card",
				message: clozeCardsArray[cardCount].partial
			}
		]).then(function(answer) {
			if (answer.card.trim().toLowerCase() === clozeCardsArray[cardCount].cloze.trim()toLowerCase()) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. " + clozeCardsArray[cardCount].text);
			}
			// Increase cardCount and use recursion to play next card
			cardCount++;
			playCloze(cardCount);
		});
	}
	// Uses inquirer to ask the user if they would like to add their own cards
	// Runs the addClozeCard function if the user confirms
	else {
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "You have completed the flashcards. Would you like to add your own for next time?"
			}
		]).then(function(answer) {
			if (answer.confirm === true) {
				addClozeCard(0);
			}
			else {
				console.log("Thanks for playing! Come back again soon.");
			}
		});
	}
}

// User submits the front and back for three separate flashcards and then
// is given the option to go through the cards again
function addBasicCard(cardCount) {
	if (cardCount < 3) {
		cardCount++;
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
			console.log("Card added succesfully!");
			// Execute function with new cardCount in order to begin recursive looop
			addBasicCard(cardCount);
		});
	}
	else {
		console.log("Your cards have been added!");
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Would you like to go through the cards again?"
			}
		]).then(function(answer) {
			if (answer.confirm === true) {
				playBasic(0);
			}
			else {
				console.log("Thanks for playing. Come back again soon!");
			}
		});
	}
}

// User submits full card text and cloze portion for three separate flashcards and then
// is given the option to go through the cards again
function addClozeCard(cardCount) {
	if (cardCount < 3) {
		cardCount++;
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
			if (!answers.text.includes(answers.cloze)) {
				console.log("Card cannot be added. Card text does not contain the cloze portion");
			}
			else {
				var card = new ClozeCard(answers.text, answers.cloze);
				clozeCardsArray.push(card);
				console.log("Card added succesfully!");
			}
			// Execute function with new cardCount in order to begin recursive looop
			addClozeCard(cardCount);
		});
	}
	else {
		console.log("Your cards have been added!");
		inquirer.prompt([
			{
				name: "confirm",
				type: "confirm",
				message: "Would you like to go through the cards again?"
			}
		]).then(function(answer) {
			if (answer.confirm === true) {
				playCloze(0);
			}
			else {
				console.log("Thanks for playing. Come back again soon!");
			}
		});
	}
}
