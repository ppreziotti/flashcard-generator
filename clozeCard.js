// Constructor function for creating a cloze-deletion flashcard
function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.partial = this.text.replace(this.cloze, "...");
}

// Exporting the ClozeCard constructor
module.exports = ClozeCard;
