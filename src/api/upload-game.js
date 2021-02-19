const superagent = require('superagent');
const fs = require('fs');

module.exports = async (
  {
    host,
    organization,
    gameId,
    authorization,
    bundle,
    comment,
    onProgress = () => {
    }
  }) => {

  const data = {
    comment: comment || 'Upload via vputil',
  };

  const response = await superagent
    .post(`${host}/joker/developers/v2/${organization}/game/${gameId}/version`)
    .set('Authorization', authorization)
    .on('progress', onProgress)
    .send(data);

  console.debug(`response: ${response.text}`);

  const uploadUrl = response.body.upload_url;

  const file = fs.readFileSync(bundle);

  await superagent
    .put(uploadUrl)
    .set('Content-Type', 'application/zip')
    .on('progress', onProgress)
    .send(file);

  return response.body;
};
