import * as yup from 'yup';
import { attachChild, createPerson, createRelationship } from 'db';

export default {
  // TODO: FIXME: validation
  validationSchema: yup.object(),
  resolve: async function createParentsMutation(
    root,
    { personId, parents: parentsData, lineage },
  ) {
    const parents = await Promise.all(
      parentsData.map(
        async ({
          sex,
          name: { given, surname },
          birth: {
            date: birthDate,
            place: birthPlace,
            placeId: birthPlaceId,
          } = {},
          death: {
            date: deathDate,
            place: deathPlace,
            placeId: deathPlaceId,
          } = {},
        }) => {
          return createPerson({
            sex,
            given,
            surname,
            birthDate,
            birthPlace,
            birthPlaceId,
            deathDate,
            deathPlace,
            deathPlaceId,
          });
        },
      ),
    );

    const relationship = await createRelationship(
      parents[0].id,
      parents.length > 1 ? parents[1].id : null,
    );

    return attachChild(relationship.id, personId, lineage);
  },
};
