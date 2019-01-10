import moment from 'moment';
import randToken from 'rand-token';
import makeUuid from 'uuid/v4';

class User {
  constructor(conn) {
    this.conn = conn;
  }

  createToken(user) {
    return this.conn('user_tokens')
      .insert(
        {
          id: makeUuid(),
          user_id: user.id,
          // TODO: Auth logic shouldn't be in dbal layer...
          token: randToken.generate(48),
          expires: moment()
            .add('8', 'hours')
            .toISOString(),
        },
        '*',
      )
      .then(v => v[0]);
  }

  findUserByIds(ids) {
    return this.conn('users')
      .select('*')
      .whereIn('id', ids);
  }

  findTokenBy(where) {
    const query = this.conn('user_tokens AS t');

    for (const key of Object.keys(where)) {
      query.whereRaw(`LOWER(${key}) = ?`, [where[key].toLowerCase()]);
    }

    return query.then(v => v[0]);
  }

  findOneBy(where) {
    const query = this.conn('users').select('*');

    for (const key of Object.keys(where)) {
      query.whereRaw(`LOWER(${key}) = ?`, [where[key].toLowerCase()]);
    }

    return query.then(v => v[0]);
  }
}

export default User;
