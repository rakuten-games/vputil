const os = require('os');
const mock = require('mock-fs');

delete require.cache[require.resolve('../../src/storage/config-store')];

const configStore = require('../../src/storage/config-store');

describe('config-store', function () {
  beforeAll(function () {
    const path = `${os.homedir()}/.config/`;

    mock({
      [path]: {},
    });
  });

  afterAll(function () {
    mock.restore();
  });

  it('gets default token', async function () {
    const val = configStore.get('token');
    expect(val).toEqual(undefined);
  });

  it('gets default output', async function () {
    const val = configStore.get('output');
    expect(val).toEqual(undefined);
  });

  it('sets token value', async function () {
    configStore.set('token', 'foo');
    const val = configStore.get('token');

    expect(val).toEqual('foo');
  });

  it('sets output value', async function () {
    configStore.set('output', 'foo');
    const val = configStore.get('output');

    expect(val).toEqual('foo');
  });

  it('rejects to set the invalid key', async function () {
    let val = undefined;

    try {
      configStore.set('foo', 'bar');
    } catch (err) {
      val = err;
    }

    expect(val).not.toEqual(undefined);
  });
});
