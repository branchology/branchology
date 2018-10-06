import * as yup from 'yup';
import { createPerson, createRelationship } from 'db';

export default {
  // TODO: FIXME:
  validationSchema: yup.object(),
  resolve: function createSpouseMutation(
    root,
    { personId, name, birth, death, sex },
    context,
  ) {
    const { given, surname } = name;
    const { date: birthDate, place: birthPlace, placeId: birthPlaceId } = birth;
    const { date: deathDate, place: deathPlace, placeId: deathPlaceId } = death;

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
    }).then(spouse => {
      return createRelationship(personId, spouse.id).then(relationship => ({
        relationship,
      }));
    });
  },
};
