// simpleChain.js
// Use this file to test BlockChain functionality

const BlockChain = require('./BlockChain.js')
const Block = require('./Block.js')

let myBlockChain = new BlockChain.Blockchain();

setTimeout(function () {
	console.log('Starting test...')
}, 1000);

// Create 10 test Blocks
setTimeout(function () {
	console.log('Create 10 Blocks...');
	(function theLoop (i) {
		setTimeout(function () {
			let testBlock = new Block.Block('Test Block - ' + (i + 1))
			myBlockChain.addBlock(testBlock)
			.then((result) => {
				console.log(result)
				i++
				if (i < 10) theLoop(i)
			})
			.catch((error) => {
				console.log(error)
			})
		}, 1000)
	})(0)
}, 2000);

// Get chain height
setTimeout(function () {
	console.log('Get Chain Height...')
	myBlockChain.getBlockHeight()
	.then((height) => {
		console.log('Chain height => ' + height)
	})
	.catch((error) => {
		console.log(error)
	})
}, 14000);

// Get Block at height
setTimeout(function () {
	console.log('Get Block at height 0...')
	myBlockChain.getBlock(0)
	.then((block) => {
		console.log(JSON.stringify(block))
	})
	.catch((error) => {
		console.log(error)
	})
}, 16000);

// Validate Block at height
setTimeout(function () {
	console.log('Validate Block at height 10...')
	myBlockChain.validateBlock(10)
	.then((valid) => {
		console.log(valid)
	})
	.catch((error) => {
		console.log(error)
	})
}, 18000);

// Tamper Blocks to test validation methods
setTimeout(function () {
	console.log('Tamper Block 5 body...')
	myBlockChain.getBlock(5)
	.then((block) => {
		let blockAux = block
		blockAux.body = 'Tampered Block'
		myBlockChain._modifyBlock(blockAux.height, blockAux)
		.then((blockModified) => {
			if (blockModified) {
				myBlockChain.validateBlock(blockAux.height)
				.then((valid) => {
					console.log(`Is #${blockAux.height} valid? => ${valid}`)
				})
				.catch((error) => {
					console.log(error)
				})
			} else {
				console.log('The Block was not modified')
			}
		})
		.catch((error) => {
			console.log(error)
		})
	})
	.catch((error) => {
		console.log(error)
	})
}, 20000);

// Tamper Block links to test validation methods
setTimeout(function () {
	console.log('Tamper Block 10 previousBlockHash...')
	myBlockChain.getBlock(10)
	.then((block) => {
		let blockAux = block
		blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi"
		myBlockChain._modifyBlock(blockAux.height, blockAux)
		.then((blockModified) => {
			if (blockModified) {
				console.log('The Block was modified')
			} else {
				console.log('The Block was not modified')
			}
		})
		.catch((error) => {
			console.log(error)
		})
	})
	.catch((error) => {
		console.log(error)
	})
}, 22000);

// Validate Blockchain
setTimeout(function () {
	console.log('Validate Blockchain...')
	myBlockChain.validateChain()
	.then((errorLog) => {
		if (errorLog.length > 0) {
			console.log('The chain is not valid:')
			errorLog.forEach(error => { console.log(error) })
		} else {
			console.log('No errors found, the chain is valid!')
		}
	})
	.catch((error) => {
		console.log(error)
	})
}, 24000);

// Delete all Blocks
setTimeout(function () {
	console.log('Delete all Blocks...')
	myBlockChain.bd.deleteAllData()
	.then((result) => {
		console.log(result)
	})
}, 26000);
