import * as yup from 'yup';

export default {
  // TODO: FIXME: validation
  validationSchema: yup.object(),
  resolve: function createSpouseMutation(
    root,
    { personId, name, sex, birth = {}, death = {}, marriage = {} },
    context,
  ) {
    const { given, surname } = name;
    const { date: birthDate, place: birthPlace, placeId: birthPlaceId } = birth;
    const { date: deathDate, place: deathPlace, placeId: deathPlaceId } = death;
    const {
      date: marriageDate,
      place: marriagePlace,
      placeId: marriagePlaceId,
    } = marriage;

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
      .then(spouse => {
        return context.dbal.relationship
          .create(personId, spouse.id, {
            marriageDate,
            marriagePlace,
            marriagePlaceId,
          })
          .then(relationship => ({
            relationship,
          }));
      });
  },
};
