// $FlowFixMe
const yargs = require('yargs')

class Cli {
  args: any
  argv: any

  constructor (args: any = yargs) {
    this.args = args
  }

  configure () {
    this.argv = this.args.usage('Usage: puree <command> [options]')
      .demand(1, 'Provide a valid command')
      .command('init', 'Scaffold project', initCommand)
      .command('ls', 'List available scaffolds', lsCommand)
      .help('h')
      .alias('h', 'help')
      .argv
  }

  get isInit () {
    return this.argv._[0] === 'init'
  }

  get isLs () {
    return this.argv._[0] === 'ls'
  }

  get source () {
    return this.argv.s
  }
}

function initCommand (args) {
  return args.usage('Usage: puree init [options]')
    .example(`puree init -s 'bbmoz/puree/example'`)
    .demandOption(['s'])
    .describe('s', 'Specify github directory')
    .alias('s', 'source')
    .nargs('s', 1)
}

function lsCommand (args) {
  return args.usage('Usage: puree ls')
}

export default Cli
