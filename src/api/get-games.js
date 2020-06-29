const superagent = require('superagent');

module.exports = async ({host, organization, authorization}) => {
  const response = await superagent
    .get(`${host}/joker/developers/v2/${organization}/game?offset=0&count=100`)
    .set('Authorization', authorization);

  console.debug(`response: ${response.text}`);

  return response.body;
};
