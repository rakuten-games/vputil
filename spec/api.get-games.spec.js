const nock = require('nock');
const getGames = require('../src/api/get-games');

describe("get-games", function () {
  it("has valid request", async function () {
    const host = 'https://foo';
    const organization = 'bar';
    const authorization = 'Bearer quz';

    const uri = `/joker/developers/v2/${organization}/game?offset=0&count=100`;

    const body = {
      foo: 'bar',
    };

    const scope = nock(host)
      .get(uri)
      .matchHeader('Authorization', authorization)
      .reply(200, body);

    const result = await getGames({
      host,
      organization,
      authorization,
    });

    expect(body).toEqual(result);

    scope.done();
  });
});
