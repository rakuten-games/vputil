const superagent = require('superagent');

module.exports = async ({host, organization, gameId, authorization}) => {
  const response = await superagent
    .get(`${host}/joker/developers/v2/${organization}/game/${gameId}`)
    .set('Authorization', authorization);

  console.debug(`response: ${response.text}`);

  return response.body;
};