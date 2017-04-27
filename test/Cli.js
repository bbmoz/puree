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

test('.isInit: checks if command is init', t => {
  cli.argv = { _: ['init'] }
  t.is(cli.isInit, true)

  cli.argv = { _: [] }
  t.is(cli.isInit, false)
})

test('.isLs: checks if command is ls', t => {
  cli.argv = { _: ['ls'] }
  t.is(cli.isLs, true)

  cli.argv = { _: [] }
  t.is(cli.isLs, false)
})

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
