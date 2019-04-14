import eventBasics from './eventBasics';
import eventFull from './eventFull';
import nameBasics from './nameBasics';

export default `
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
`;
