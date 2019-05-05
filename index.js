const EventEmitter = require('events')
const fs = require('fs')

const reads = require('./read')
const writes = require('./write')
const validations = require('./validations')

const note = fs.readFileSync('ascii.txt').toString()

class MusicPlayer {
  constructor() {
    const [,,collection] = process.argv
    this.collection = collection ? JSON.parse(collection) : {}

    this.prompt = new EventEmitter
    this.process = process
    this.process.stdin.resume()
    this.process.stdin.on('data', (data) => {
      const input = data.toString().replace(/(\r\n|\n|\r)/gm, "")
      this.validateCmd(input)
      this.process.stdout.write('> ')
    })
    this.prompt.on('start', () => {
      console.log(note)
      console.log('Welcome to your music collection!')
      this.process.stdout.write('> ')
    })
    this.prompt.on('end', () => {
      console.log('\n', result)
      this.process.stdin.pause()
    })

    this.validateCmd = validations.validateCmd.bind(this)
    this.validateAdd = validations.validateAdd.bind(this)
    this.validatePlay = validations.validatePlay.bind(this)
    this.validateShow = validations.validateShow.bind(this)
    this.addAlbum = writes.addAlbum.bind(this)
    this.play = writes.play.bind(this)
    this.logShowResults = reads.logShowResults.bind(this)

    this.prompt.emit('start')
  }

  logBadInput() { console.log('Bad input') }

  quit() {
    console.log('Bye!')
    process.exit()
  }
}

new MusicPlayer