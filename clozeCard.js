// Constructor function for creating a cloze-deletion flashcard
function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.partial = this.text.replace(this.cloze, "...");
	if (!this.text.includes(this.cloze)) {
		console.log("Error: Card text does not contain the cloze portion.");
	}
}

// Exporting the ClozeCard constructor
module.exports = ClozeCard;
