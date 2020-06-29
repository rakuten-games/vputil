const superagent = require('superagent');

module.exports = async ({host, organization, gameId, authorization, version}) => {
  const data = {
    deployed_version: version,
    staged_version: 0,
    staged_rate: 0,
  };

  const response = await superagent
    .post(`${host}/joker/developers/v3/${organization}/game/${gameId}/deployment`)
    .set('Authorization', authorization)
    .send(data);

  console.debug(`response: ${response.text}`);

  return response.body;
};