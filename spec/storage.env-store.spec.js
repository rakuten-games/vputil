const os = require('os');
const mock = require('mock-fs');

delete require.cache[require.resolve('../src/storage/env-store')];
delete require.cache[require.resolve('../src/storage/config-store')];

const envStore = require('../src/storage/env-store');
const configStore = require('../src/storage/config-store');

describe('env-store', function () {
  beforeAll(function () {
    const path = `${os.homedir()}/.config/`;

    mock({
      [path]: {},
    });
  });

  afterAll(function () {
    mock.restore();
  });

  it('gets default token in config', async function () {
    const val = configStore.get('token');
    expect(val).toEqual(undefined);
  });

  it('gets default token in env', async function () {
    const val = envStore.get('token');
    expect(val).toEqual(undefined);
  });

  it('sets token to config', async function () {
    let val;

    configStore.set('token', 'foo');

    val = envStore.get('token');
    expect(val).toEqual('foo');

    val = configStore.get('token');
    expect(val).toEqual('foo');
  });

  it('overwrites token to env', async function () {
    let val;

    envStore.set('token', 'bar');

    val = configStore.get('token');
    expect(val).toEqual('foo');

    val = envStore.get('token');
    expect(val).toEqual('bar');
  });

  it('gets and sets all', async function () {
    let val;

    envStore.setAll({
      token: 'foo',
      output: 'bar',
    })

    val = envStore.get('token');
    expect(val).toEqual('foo');

    val = envStore.get('output');
    expect(val).toEqual('bar');

    val = envStore.getAll();
    expect(val).toEqual({
      token: 'foo',
      output: 'bar',
    });
  });
});
