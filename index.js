const EventEmitter = require('events')
const prompt = new EventEmitter()

const collection = {
  '"The Wall"': ['Pink floyd', false],
  '"Luv is Rage 2"': ['Lil Uzi Vertical', true]
}

process.stdin.resume()

process.stdin.on('data', function (data) {
  const input = data.toString().replace(/(\r\n|\n|\r)/gm,"")
  validateCmd(input)
  process.stdout.write('> ')
})

prompt.on('start', function () {
  process.stdout.write('> ')
})

prompt.on('end', function () {
  console.log('\n', result)
  process.stdin.pause()
})

prompt.emit('start')

function validateCmd(input) {
  const [cmd] = input.split(' ')
  switch (cmd) {
    case 'add':
      return validateAdd(input.slice(3))
    case 'play':
      return validatePlay(input.slice(5))
    case 'show':
      return validateShow(input.slice(4))
    case 'quit':
    default:
      logBadInput()
  }
}

function validatePlay(input) {
  inputNoWS = input.replace(/\s/g, '')
  const quoteCount = (inputNoWS.match(/"/g) || []).length
  if (
    quoteCount !== 2
    || (inputNoWS[0] !== '"' || inputNoWS[inputNoWS.length - 1] !== '"')
  ) return logBadInput

  play(input)
}

function play(album) {
  if (collection[album]) {
    collection[album][1] = true
    const [artist] = collection[album]
    console.log(`Playing ${album} by ${artist}`)
  } else console.log(`${album} is not in your collection`)
}

function validateShow(cmd) {
  cmd = cmd.replace(/\s/g, '')
  cmd === 'all' || cmd === 'unplayed'
    ? logShowResults(cmd)
    : logBadInput()
}

function validateAdd(input) {
  const inputNoWS = input.replace(/\s/g, '')
  const quoteCount = (inputNoWS.match(/"/g) || []).length

  if(
    quoteCount !== 4
    || (inputNoWS[0] !== '"' || inputNoWS[inputNoWS.length - 1] !== '"')
    || inputNoWS[inputNoWS.indexOf('"', 1) + 1] !== '"'
  ) return logBadInput()
  addAlbum(input.trim())
}

function addAlbum(input) {
  const secondQt = input.indexOf('"', 1)
  const thirdQt = input.indexOf('"', secondQt + 1)
  const album = input.slice(0, secondQt + 1)
  const artist = input.slice(thirdQt + 1, -1)

  if (!collection[album]) {
    collection[album] = [artist, false]
    console.log(`Added ${album} by ${artist}`)
  } else {
    return console.log('Album is already in collection')
  }
}

function logShowResults(cmd) {
  Object.entries(collection)
    .forEach(([album, [artist, played]]) => {
      cmd === 'all'
        ? console.log(`${album} by ${artist} (${played ? 'played' : 'unplayed'})`)
        : !played
          ? console.log(`${album} by ${artist}`)
          : null
    })
}

function logBadInput() { console.log('Bad input') }
// add "$title" "$artist": adds an album to the collection with the given title and artist. All albums are unplayed by default.
// play "$title": marks a given album as played.
// show all: displays all of the albums in the collection
// show unplayed: display all of the albums that are unplayed
// show all by "$artist": shows all of the albums in the collection by the given artist
// show unplayed by "$artist": shows the unplayed albums in the collection by the given artist
// quit: quits the program
