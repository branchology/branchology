import Event from 'db/Event';
import Person from 'db/Person';
import Place from 'db/Place';
import Source from 'db/Source';
import Relationship from 'db/Relationship';
import User from 'db/User';

export function createDbal(conn) {
  return {
    event: new Event(conn),
    person: new Person(conn),
    place: new Place(conn),
    source: new Source(conn),
    relationship: new Relationship(conn),
    user: new User(conn),
  };
}
