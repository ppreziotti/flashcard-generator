var inquirer = require("inquirer");
var BasicCard = require("./basicCard.js");
var ClozeCard = require("./clozeCard.js");

// Creating empty arrays for both types of flash cards and then creating and pushing 
// three types of each card to their respective arrays
var basicCardsArray = [];
var clozeCardsArray = [];

var card1 = new BasicCard("In what year did North Carolina become a state?", "1789");
var card2 = new BasicCard("In what year did the Wright Brothers first succesfully fly a plane in Kitty Hawk, NC?", "1903");
var card3 = new BasicCard("In what year did UNC win its first men's basketball national championship?", "1957");

var card4 = new ClozeCard("Charlotte is the largest city in North Carolina.", "Charlotte");
var card5 = new ClozeCard("The cardinal is the North Carolina state bird.", "cardinal");
var card6 = new ClozeCard("North Carolina's state nickname is the Tar Heel State.", "Tar Heel State");

basicCardsArray.push(card1, card2, card3)
clozeCardsArray.push(card4, card5, card6);

function askQuestions(cardCount) {
	if (cardCount < basicCardsArray.length) {
		inquirer.prompt([
			{
				name: "question",
				message: basicCardsArray[cardCount].front
			}
		]).then(function(answer) {
			if (answer.question === basicCardsArray[cardCount].back) {
				console.log("Correct!");
			}
			else {
				console.log("Incorrect. The correct answer was " + basicCardsArray[cardCount].back + ".");
			}
			cardCount++;
			askQuestions(cardCount);
		})
	}
	// Need to make else if for going through ClozeCards array and place here
	else {
		console.log("You have completed the questions. Would you like to add your own for next time?");
	}
}

askQuestions(0);