const minimist = require('minimist');

/** Main */
module.exports = () => {
  const args = minimist(process.argv.slice(2));
  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }
  switch (cmd) {
    case 'start':
      require('./src/cmd/start')(args)
      break
    case 'help':
      require('./src/cmd/help')(args)
      break
    case 'version':
      require('./src/cmd/version')()
    default:
      console.error(`"${cmd}" is not a valid command`)
      break
  }
}

