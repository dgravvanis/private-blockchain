// LevelSandbox.js
// Persist data with LevelDB

const level = require('level')
const chainDB = './chaindata'

// a LevelSandbox class
class LevelSandbox {

  constructor() {
    this.db = level(chainDB)
  }

  // Promise => Block Object
  // Get data from levelDB with key
  // Returns Block Object or null
  getLevelDBData(key) {

    let self = this
    // Return promise
    return new Promise(function(resolve, reject) {
      // Get block
      self.db.get(key, function(err, value) {
        // If block not found resolve with null
        if (err instanceof level.errors.NotFoundError) {
          resolve(null)
        } else if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(value))
        }
      })
    })
  }

  // Promise => value
  // Add data to levelDB with key and value
  addLevelDBData(key, value) {

    let self = this
    // Return promise
    return new Promise(function(resolve, reject) {
      // Add block
      self.db.put(key, value, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  }

  // Promise => Number
  // Returns the height of the chain
  getBlocksCount() {

    let self = this
    // Return promise
    return new Promise(function(resolve, reject) {
      let dataArray = []
      // Read data entries
      self.db.createReadStream()
      .on('data', function (data) {
        dataArray.push(data)
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function () {
        resolve(dataArray.length)
      })
    })
  }

  // Promise => String
  // Deletes all data from storage
  // Used for testing, to clean up the database
  deleteAllData() {

    let self = this
    // Return promise
    return new Promise(function(resolve, reject) {
      // Read data entries
      let i = 0
      self.db.createReadStream()
      .on('data', function (data) {
        // Delete block
        self.db.del(i, function(err) {if (err) reject(err)})
        i++
      })
      .on('error', function (err) {
        reject(err)
      })
      .on('close', function () {
        resolve('all blocks were deleted')
      })
    })
  }
}
// export LevelSandbox class
module.exports.LevelSandbox = LevelSandbox
