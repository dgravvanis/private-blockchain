// Block.js
// a Block class
class Block {
	constructor(data) {
		// Block properties
		this.hash = ''
		this.height = 0
		this.body = data
		this.time = 0
		this.previousBlockHash = ''
	}
}
// export Block class
module.exports.Block = Block
