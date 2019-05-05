function logShowResults(cmd) {
  const collection = Object.entries(this.collection)
  if(collection.length === 0) return console.log('No albums have been added')
  collection
    .forEach(([album, [artist, played]]) => {
      cmd === 'all'
        ? console.log(`${album} by ${artist} (${played ? 'played' : 'unplayed'})`)
        : !played
          ? console.log(`${album} by ${artist}`)
          : null
    })
}

module.exports = { logShowResults }