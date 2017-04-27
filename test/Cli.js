import test from 'ava'
import { mock, match } from 'sinon'
import Cli from './../src/Cli'

test('init: instance vars', t => {
  t.is(cli.args, args)
})

test('.configure(): setup cli commands', t => {
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

test('.isInit, .isLs: checks which command was used', t => {
  checkCommand('init', t)
  checkCommand('ls', t)
})

function checkCommand (command, t) {
  const getter = 'is' + command.charAt(0).toUpperCase() + command.slice(1)

  cli.argv = { _: [command] }
  t.is(cli[getter], true)

  cli.argv = { _: [] }
  t.is(cli[getter], false)
}

let cli, args
test.beforeEach('setup', () => {
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
})
