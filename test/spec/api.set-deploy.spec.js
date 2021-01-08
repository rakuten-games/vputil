const nock = require('nock');
const setDeploy = require('../../src/api/set-deploy');

describe("set-deploy", function () {
  it("has valid request", async function () {
    const host = 'https://foo';
    const organization = 'bar';
    const gameId = 'baz';
    const authorization = 'Bearer quz';
    const version = 5;

    const uri = `/joker/developers/v3/${organization}/game/${gameId}/deployment`;

    const body = {
      foo: 'bar',
    };

    const scope = nock(host)
      .post(uri)
      .matchHeader('Authorization', authorization)
      .reply(200, body);

    const result = await setDeploy({
      host,
      organization,
      gameId,
      authorization,
      version,
    });

    expect(body).toEqual(result);

    scope.done();
  });
});
