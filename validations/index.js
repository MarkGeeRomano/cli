function validateCmd(input) {
  const [cmd] = input.split(' ')
  switch (cmd) {
    case 'add':
      return this.validateAdd(input.slice(3))
    case 'play':
      return this.validatePlay(input.slice(5))
    case 'show':
      return this.validateShow(input.slice(4))
    case 'quit':
      return this.quit()
    default:
      this.logBadInput()
  }
}

function validateAdd(input) {
  const inputNoWS = input.replace(/\s/g, '')
  const quoteCount = (inputNoWS.match(/"/g) || []).length

  if (
    quoteCount !== 4
    || (inputNoWS[0] !== '"' || inputNoWS[inputNoWS.length - 1] !== '"')
    || inputNoWS[inputNoWS.indexOf('"', 1) + 1] !== '"'
  ) return this.logBadInput()
  this.addAlbum(input.trim())
}

function validateShow(cmd) {
  cmd = cmd.replace(/\s/g, '')
  cmd === 'all' || cmd === 'unplayed'
    ? this.logShowResults(cmd)
    : this.logBadInput()
}

function validatePlay(input) {
  inputNoWS = input.replace(/\s/g, '')
  const quoteCount = (inputNoWS.match(/"/g) || []).length
  if (
    quoteCount !== 2
    || (inputNoWS[0] !== '"' || inputNoWS[inputNoWS.length - 1] !== '"')
  ) return this.logBadInput()

  this.play(input)
}

module.exports = {
  validateCmd,
  validateAdd,
  validatePlay,
  validateShow
}