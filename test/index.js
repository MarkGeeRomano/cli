const test = require('ava')
const { spawn } = require('child_process')
const fs = require('fs')

const ascii = fs.readFileSync('./ascii.txt').toString()

test.beforeEach(t => t.context.musicPlayer = spawn('node', [__dirname]))
test.afterEach(t => t.context.musicPlayer = null)

test('should log welcome msg', async (t) => {
  const { musicPlayer } = t.context
  const tests = [
    output => output.includes(ascii),
    output => output.includes('Welcome to your music collection!'),
  ]
  await new Promise((resolve) => {
    musicPlayer.stdout.on('data', (data) => {
      const test = tests.shift()
      t.true(test(data.toString()))
      if (tests.length === 0) return resolve()
    })
  })
})

test.skip('"show all should" log no albums msg when empty', async (t) => {
  const { musicPlayer } = t.context
  const test = output => output.includes('No albums have been added')

  musicPlayer.stdin.write('show all')
  await new Promise((resolve) => {
    let logCount = 0
    let startCount = 3
    musicPlayer.stdout.on('data', (data) => {
      if (++logCount === startCount) {
        t.true(test(data.toString().trim()))
        resolve()
      }
    })
  })
})

test.skip('add should log added message', async (t) => {
  const { musicPlayer } = t.context
  const test = output => output.includes('Added')

  musicPlayer.stdin.write('add "foo" "bar"')
  await new Promise((resolve) => {
    let logCount = 0
    let startCount = 3
    musicPlayer.stdout.on('data', (data) => {
      if (logCount++ === startCount) {
        t.log('>>>>>',data.toString())
        t.true(test(data.toString().trim()))
        resolve()
      }
    })
  })
})

test.skip('show all should show collection when not empty', async (t) => {
  const { musicPlayer } = t.context
  const test = output => output.includes('"foo" by bar')
  const nextCmd = () => musicPlayer.stdin.write('show all')

  musicPlayer.stdin.write('add "foo" "bar"')
  await new Promise((resolve) => {
    let logCount = 0
    let startCount = 4
    musicPlayer.stdout.on('data', (data) => {
      if (logCount++ === startCount) {
        t.true(test(data.toString().trim()))
        resolve()
      } else if (logCount === 3) {
        nextCmd()
      }
    })
  })
})

test.skip('show unplayed should show unplayed albums', async (t) => {
  const { musicPlayer } = t.context
  const tests = [
    output => output.includes('"foo" by bar'),
    output => output.includes('"foo fighters" by bar fighters')
  ]
  const nextCmds = [
    () => musicPlayer.stdin.write('add "foo fighters" "bar fighters"'),
    () => musicPlayer.stdin.write('show unplayed')
  ]

  musicPlayer.stdin.write('add "foo" "bar"')
  await new Promise((resolve) => {
    let logCount = 0
    let targetCounts = [ 6, 7 ]
    musicPlayer.stdout.on('data', (data) => {
      if (targetCounts.includes(logCount++)) {
        t.true(tests.shift()(data.toString().trim()))
        Math.max(...targetCounts) === logCount - 1
          && resolve()
      } else if (logCount === 3 || logCount === 6) {
        nextCmds.shift()()
      }
    })
  })
})

test.skip('play should show playing msg', async (t) => {
  const { musicPlayer } = t.context
  const tests = [
    output => output.includes('"foo" by bar'),
    output => output.includes('"foo fighters" by bar fighters')
  ]
  const nextCmds = [
    () => musicPlayer.stdin.write('add "foo fighters" "bar fighters"'),
    () => musicPlayer.stdin.write('show unplayed')
  ]

  musicPlayer.stdin.write('add "foo" "bar"')
  await new Promise((resolve) => {
    let logCount = 0
    let targetCounts = [ 6, 7 ]
    musicPlayer.stdout.on('data', (data) => {
      if (targetCounts.includes(logCount++)) {
        t.true(tests.shift()(data.toString().trim()))
        Math.max(...targetCounts) === logCount - 1
          && resolve()
      } else if (logCount === 3 || logCount === 6) {
        nextCmds.shift()()
      }
    })
  })
})

