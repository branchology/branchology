import DataLoader from 'dataloader';
import { organizeResultsById } from 'lib';

export default class UserLoader {
  constructor(dbal) {
    this.findUserById = new DataLoader(ids =>
      dbal.user.findUserByIds(ids).then(data => organizeResultsById(data, ids)),
    );
  }
}
