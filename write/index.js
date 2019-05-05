function addAlbum(input) {
  const secondQt = input.indexOf('"', 1)
  const thirdQt = input.indexOf('"', secondQt + 1)
  const album = input.slice(0, secondQt + 1)
  const artist = input.slice(thirdQt + 1, -1)

  if (!this.collection[album]) {
    this.collection[album] = [artist, false]
    console.log(`Added ${album} by ${artist}`)
  } else {
    return console.log('Album is already in collection')
  }
}

function play(album) {
  if (this.collection[album]) {
    this.collection[album][1] = true
    const [artist] = this.collection[album]
    console.log(`You're listening to ${album} by ${artist}`)
  } else console.log(`${album} is not in your collection`)
}

module.exports = {
  play,
  addAlbum
}