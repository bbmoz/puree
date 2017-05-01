import test from 'ava'
import { mock, match } from 'sinon'
import Cli from './../src/Cli'

test('.configure(): setup cli commands', t => { t.plan(1)
  const argsMock = mock(args)
  argsMock.expects('usage')
    .once()
    .withExactArgs('Usage: puree <command> [options]')
    .returns(args)
  argsMock.expects('demand')
    .once()
    .withExactArgs(1, 'Provide a valid command')
    .returns(args)
  argsMock.expects('command')
    .once()
    .withExactArgs('init', 'Scaffold project', match.func)
    .returns(args)
  argsMock.expects('command')
    .once()
    .withExactArgs('ls', 'List available scaffolds', match.func)
    .returns(args)
  argsMock.expects('help')
    .once()
    .withExactArgs('h')
    .returns(args)
  argsMock.expects('alias')
    .once()
    .withExactArgs('h', 'help')
    .returns({
      argv: 'rainbow'
    })

  cli.configure()

  argsMock.verify()
  t.is(cli.argv, 'rainbow')
})

test('.isInit, .isLs: checks which command was used', t => { t.plan(4)
  checkCommand('init', t)
  checkCommand('ls', t)
})

test('.source: gets option values', t => { t.plan(1)
  const source = 'some-source'
  cli.argv = { s: source }
  t.is(cli.source, source)
})

function checkCommand (command, t) {
  const getter = 'is' + command.charAt(0).toUpperCase() + command.slice(1)

  cli.argv = { _: [command] }
  t.is(cli[getter], true)

  cli.argv = { _: [] }
  t.is(cli[getter], false)
}

let cli, args
test.beforeEach('setup', t => {
  args = {
    demand () {},
    usage () {},
    command () {},
    example () {},
    demandOption () {},
    describe () {},
    alias () {},
    nargs () {},
    help () {}
  }
  cli = new Cli(args)
  t.is(cli.args, args)
})
