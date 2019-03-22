import { expect } from 'chai';
import { validateGedcomDate } from './index';

describe('validator/validateGedcomDate', function() {
  it('should return true for all valid dates', function() {
    const valid = [
      '14 Jan 1901',
      '14 JAN',
      'jan 1901',
      '1901',
      'abt 1901',
      'aft 1901',
      'bet 14 Jan 1901 and 19 JAN 1901',
      'bet 14 JAN AND 17 JAN',
      'bet jan 1901 AND 1918',
      'bet 1901 and 1952',
    ];

    for (const example of valid) {
      expect(validateGedcomDate(example), `${example} should be valid`).to.be
        .true;
    }
  });
});
