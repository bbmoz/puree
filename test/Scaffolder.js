import test from 'ava'
import { mock, stub } from 'sinon'
import Scaffolder from './../src/Scaffolder'

test('._download(): download repo', async t => { t.plan(1)
  const url = 'https://github.com/bbmoz/puree'
  const name = await scaffolder._download(url)
  t.is(name, 'puree')
})

test('._download(): error', async t => { t.plan(1)
  const url = 'bbmoz'
  try {
    await scaffolder._download(url)
    t.fail()
  } catch (error) {
    t.is(error.name, 'Error')
  }
})

test('.load(): download resource and copy scaffold', async t => {
  const resource = 'bbmoz/puree'

  scaffolder._download = stub()
    .withArgs(`https://github.com/${resource}`)
    .returns(new Promise(resolve => {
      resolve('puree')
    }))

  const loggerMock = mock(logger)
  loggerMock.expects('log')
    .once()
    .withExactArgs('grabbed resource: puree')
  loggerMock.expects('log')
    .once()
    .withExactArgs('copied scaffold!')

  await scaffolder.load(resource)

  loggerMock.verify()
  t.pass()
})

test('.load(): error', async t => {
  const resource = 'bbmoz/puree'

  scaffolder._download = stub()
    .withArgs(`https://github.com/${resource}`)
    .returns(new Promise(resolve => {
      resolve('rainbow')
    }))

  const loggerMock = mock(logger)
  loggerMock.expects('log')
    .once()
    .withExactArgs('grabbed resource: rainbow')
  loggerMock.expects('error')
    .once()

  await scaffolder.load(resource)

  loggerMock.verify()
  t.pass()
})

let scaffolder, logger
test.beforeEach('setup', t => { t.plan(1)
  const executeMock = function (command, cb) {
    if (command === 'mkdir -p .cache/ && cd .cache/ && svn checkout --trust-server-cert --non-interactive https://github.com/bbmoz/puree' ||
      command === 'cp -rf .cache/puree/trunk/* .') {
      cb()
    } else {
      cb(new Error())
    }
  }
  logger = {
    log () {},
    error () {}
  }
  scaffolder = new Scaffolder(executeMock, logger)
  t.is(scaffolder.execute, executeMock)
})
