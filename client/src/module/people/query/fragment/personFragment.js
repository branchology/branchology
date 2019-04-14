import attributeFragment from './attribute';
import eventBasics from './eventBasics';
import eventFull from './eventFull';
import nameBasics from './nameBasics';
import name from './name';
import relationship from './relationship';

export default `
  id
  sex
  parents {
    id
    type
    relationship {
      id
      people {
        id
        name {
          ${nameBasics}
        }
      }
    }
  }
  name {
    ${nameBasics}
  }
  birth {
    ${eventBasics}
  }
  death {
    ${eventBasics}
  }
  events {
    ${eventFull}
    isPreferred
  }
  attributes {
    ${attributeFragment}
  }
  names {
    ${name}
  }
  relationships {
    ${relationship}
  }
  notes {
    id
    note
  }
`;
