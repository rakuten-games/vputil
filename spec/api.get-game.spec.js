const nock = require('nock');
const getGame = require('../src/api/get-game');

describe('get-game', function () {
  it('has valid request', async function () {
    const host = 'https://foo';
    const organization = 'bar';
    const gameId = 'baz';
    const authorization = 'Bearer quz';

    const uri = `/joker/developers/v2/${organization}/game/${gameId}`;

    const body = {
      foo: 'bar',
    };

    const scope = nock(host)
      .get(uri)
      .matchHeader('Authorization', authorization)
      .reply(200, body);

    const result = await getGame({
      host,
      organization,
      gameId,
      authorization,
    });

    expect(body).toEqual(result);

    scope.done();
  });
});
