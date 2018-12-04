import citation from './citation';
import nameBasics from './nameBasics';

export default `
  ${nameBasics}
  isPreferred
  sourceCitations {
    ${citation}
  }
`;
