let data = {};


class Auth {
  constructor(token) {
    try {
      console.debug(`token: ${token}`);

      const parts = token.split('.');

      this._header = JSON.parse(Buffer.from(parts[0], 'base64').toString());
      this._payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
      this._signature = Buffer.from(parts[2], 'base64');

      console.debug('header:');
      console.debug(this._header);
      console.debug('payload:');
      console.debug(this._payload);
      console.debug('signature:');
      console.debug(this._signature);
    } catch (err) {
      throw new Error(`Not a valid token for "${token}". ${err.message}`);
    }
  }

  get org() {
    return this._payload.org;
  }

  get aud() {
    return this._payload.aud;
  }

  get exp() {
    return this._payload.exp;
  }

  get signature() {
    return this._signature;
  }
}


const parse = (token) => new Auth(token);

module.exports = {
  parse,
};