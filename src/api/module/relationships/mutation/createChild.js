import * as yup from 'yup';
import { createPerson, attachChild } from 'db';

export default {
  // TODO: FIXME:
  validationSchema: yup.object(),
  resolve: function createChildMutation(
    root,
    { relationshipId, name, birth = {}, death = {}, sex },
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
    }).then(child => {
      return attachChild(relationshipId, child.id).then(() => ({
        person: child,
      }));
    });
  },
};
