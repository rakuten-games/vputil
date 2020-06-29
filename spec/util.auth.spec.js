const auth = require('../src/util/auth');

describe('env-store', function () {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6W10sIm9yZyI6ImZvbyIsImF1ZCI6ImJhciIsImV4cCI6MTUwMDAwMDAwMH0.zBB0fVFCmw8QFJFG_MmstaZlP3n_PRS8ox0PVJnVoI8';
  const jwt = auth.parse(token);

  it('has exp', async function () {
    expect(jwt.exp).toEqual(1500000000);
  });

  it('has aud', async function () {
    expect(jwt.aud).toEqual('bar');
  });

  it('has org', async function () {
    expect(jwt.org).toEqual('foo');
  });
});
