import attributeFragment from './attribute';
import eventBasics from './eventBasics';
import eventFull from './eventFull';
import nameBasics from './nameBasics';
import name from './name';

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
    id
    events {
      ${eventFull}
    }
    people {
      id
      name {
        ${nameBasics}
      }
    }
    children {
      id
      type
      person {
        id
        birth {
          ${eventBasics}
        }
        death {
          ${eventBasics}
        }
        name {
          ${nameBasics}
        }
      }
    }
  }
  notes {
    id
    note
  }
`;
