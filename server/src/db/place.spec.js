import { expect } from 'chai';
import mockKnex from 'mock-knex';
import conn from './conn';
import { createPlace } from './place';
import { uuidRegex } from '../../test/constants';

describe('db place', function scope() {
  beforeEach(() => {
    mockKnex.mock(conn);

    this.tracker = mockKnex.getTracker();
    this.tracker.install();
  });

  afterEach(() => {
    mockKnex.unmock(conn);
    this.tracker.uninstall();
  });

  describe('createPlace()', () => {
    it('should insert a place', async () => {
      const result = { id: '1241414', description: 'Washington, D.C.' };

      this.tracker.on('query', (query, step) => {
        if (step === 1) {
          expect(query.sql).to.equal(
            'insert into "places" ("country", "description", "id", "postal_code", "state_province") values ($1, $2, $3, DEFAULT, DEFAULT) returning *',
          );
          expect(query.bindings[0]).to.equal('US');
          expect(query.bindings[1]).to.equal('Washington, D.C.');
          expect(query.bindings[2]).to.match(uuidRegex);
          query.response([result]);
        } else {
          console.log(trackedQuery.sql);
          trackedQuery.response([]);
        }
      });

      const place = await createPlace({
        description: 'Washington, D.C.',
        country: 'US',
      });

      expect(place).to.equal(result);
    });
  });
});
