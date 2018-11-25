import citation from './citation';
import eventBasics from './eventBasics';
import eventFull from './eventFull';
import nameBasics from './nameBasics';

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
    ${eventFull}
    data
    isPreferred
  }
  names {
    ${nameBasics}
    isPreferred
    sourceCitations {
      ${citation}
    }
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
