import * as yup from 'yup';

export default {
  // TODO: FIXME: validation
  validationSchema: yup.object(),
  resolve: function createChildMutation(
    root,
    { relationshipId, name, lineage, birth = {}, death = {}, sex },
    context,
  ) {
    const { given, surname } = name;
    const { date: birthDate, place: birthPlace, placeId: birthPlaceId } = birth;
    const { date: deathDate, place: deathPlace, placeId: deathPlaceId } = death;

    return context.dbal.person
      .create({
        sex,
        given,
        surname,
        birthDate,
        birthPlace,
        birthPlaceId,
        deathDate,
        deathPlace,
        deathPlaceId,
      })
      .then(child => {
        return context.dbal.relationship
          .attachChild(relationshipId, child.id, lineage)
          .then(() => ({
            person: child,
          }));
      });
  },
};
