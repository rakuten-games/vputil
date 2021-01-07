const nock = require('nock');
const uploadGame = require('../../src/api/upload-game');

describe("upload-game", function () {
  it("has valid request", async function () {
    const host = 'https://foo';
    const organization = 'bar';
    const gameId = 'baz';
    const authorization = 'Bearer quz';
    const bundle = __filename;

    const versionUri = `/joker/developers/v2/${organization}/game/${gameId}/version`;
    const uploadUri = `/quux`;

    const body = {
      upload_url: `${host}${uploadUri}`,
    };

    const versionScope = nock(host)
      .post(versionUri)
      .matchHeader('Authorization', authorization)
      .reply(200, body);

    const uploadScope = nock(host)
      .put(uploadUri)
      .reply(200, {});

    const result = await uploadGame({
      host,
      organization,
      authorization,
      gameId,
      bundle,
    });

    expect(body).toEqual(result);

    versionScope.done();
    uploadScope.done();
  });
});
