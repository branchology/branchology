import DataLoader from 'dataloader';
import { findPersonPrimaryEventsByPersonIdAndType } from 'db';

export default new DataLoader(pairs =>
  findPersonPrimaryEventsByPersonIdAndType(pairs).then(events => {
    return pairs.map(([id, type]) => {
      return events.find(
        result => result.person_id === id && result.type === type,
      );
    });
  }),
);
