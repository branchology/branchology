import { expect } from 'chai';
import returnFirst from './returnFirst';

describe('lib returnFirst', () => {
  it('should return the first element of the array', () => {
    const expected = { name: 'Bob' };
    const people = [expected, { name: 'Clark' }, { name: 'Debby' }];

    expect(returnFirst(people)).to.equal(expected);
  });
});
