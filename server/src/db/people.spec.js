import { expect } from 'chai';
import mockKnex from 'mock-knex';
import conn from './conn';
import { createPerson, createPersonName } from './people';
import { uuidRegex } from '../../test/constants';

describe('db people', function scope() {
  beforeEach(() => {
    mockKnex.mock(conn);

    this.tracker = mockKnex.getTracker();
    this.tracker.install();
  });

  afterEach(() => {
    mockKnex.unmock(conn);
    this.tracker.uninstall();
  });

  describe('createPerson()', () => {
    context('with no death information', () => {});
    context('with no death place', () => {});
    context('with no death date', () => {});
    context('with full death information', () => {
      it('should insert a new location before creating the event', () => {});
    });
    context('with existing death place', () => {});

    context('with no birth information', () => {});
    context('with no birth place', () => {});
    context('with no birth date', () => {});
    context('with full birth information', () => {});
    context('with existing birth place', () => {});

    context('with only name data', () => {
      it('should insert a person and a person name', async () => {
        const expectedPerson = { id: '1241414', sex: 'M' };

        this.tracker.on('query', (query, step) => {
          if (step === 1) {
            expect(query.sql).to.equal(
              'insert into "people" ("id", "sex", "slug") values ($1, $2, $3) returning *',
            );
            expect(query.bindings[0]).to.match(uuidRegex);
            expect(query.bindings[1]).to.equal('M');
            expect(query.bindings[2]).to.equal('Abraham-Lincoln');
            query.response([expectedPerson]);
          } else if (step === 2) {
            expect(query.sql).to.equal(
              'insert into "person_names" ("given_name", "id", "person_id", "surname") values ($1, $2, $3, $4) returning *',
            );
            expect(query.bindings[0]).to.equal('Abraham');
            expect(query.bindings[1]).to.match(uuidRegex);
            expect(query.bindings[2]).to.match(uuidRegex);
            expect(query.bindings[3]).to.equal('Lincoln');
            query.response([{ id: '4444', person_id: '1241414' }]);
          } else {
            console.log(trackedQuery.sql);
            trackedQuery.response([]);
          }
        });

        const newPerson = await createPerson({
          sex: 'M',
          givenName: 'Abraham',
          surname: 'Lincoln',
        });

        expect(newPerson).to.equal(expectedPerson);
      });
    });
  });

  describe('createPersonName()', () => {
    it('should insert a person name', async () => {
      const response = { id: '4444', person_id: '1241414' };

      this.tracker.on('query', (query, step) => {
        if (step === 1) {
          expect(query.sql).to.equal(
            'insert into "person_names" ("given_name", "id", "person_id", "surname") values ($1, $2, $3, $4) returning *',
          );
          expect(query.bindings[0]).to.equal('Abraham');
          expect(query.bindings[1]).to.match(uuidRegex);
          expect(query.bindings[2]).to.match(uuidRegex);
          expect(query.bindings[3]).to.equal('Lincoln');
          query.response([response]);
        } else {
          throw `Unexpected query: ${query.sql}`;
        }
      });

      const name = await createPersonName(
        'e15067c6-feb9-42f9-a7d0-86048f66e777',
        {
          givenName: 'Abraham',
          surname: 'Lincoln',
        },
      );

      expect(name).to.equal(response);
    });
  });
});
