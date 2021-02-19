const superagent = require('superagent');

module.exports = async ({ host, organization, gameId, authorization }) => {
  const response = await superagent
    .get(`${host}/joker/developers/v3/${organization}/game/${gameId}/deployment`)
    .set('Authorization', authorization);

  console.debug(`response: ${response.text}`);

  return response.body.data;
};
