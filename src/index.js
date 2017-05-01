import Cli from './Cli'
import Scaffolder from './Scaffolder'

const cli = new Cli()
const scaffolder = new Scaffolder()

cli.configure()

if (cli.isInit) {
  scaffolder.load(cli.source)
} else if (cli.isLs) {
  console.warn('not yet implemented')
}
