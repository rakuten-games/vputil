const nock = require('nock');
const getGameDeployment = require('../../src/api/get-game-deployment');

describe('get-game-deployment', function () {
  it('has valid request', async function () {
    const host = 'https://foo';
    const organization = 'bar';
    const gameId = 'baz';
    const authorization = 'Bearer quz';

    const uri = `/joker/developers/v3/${organization}/game/${gameId}/deployment`;

    const body = {
      data: {
        foo: 'bar',
      }
    };

    const scope = nock(host)
      .get(uri)
      .matchHeader('Authorization', authorization)
      .reply(200, body);

    const result = await getGameDeployment({
      host,
      organization,
      gameId,
      authorization,
    });

    expect(body.data).toEqual(result);

    scope.done();
  });
});
