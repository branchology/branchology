import * as yup from 'yup';
import db from 'db/conn';
import Person from 'db/Person';

// TODO: FIXME:
const person = new Person(db);

export default {
  validationSchema: yup
    .object()
    .shape({
      name: yup.object().shape({
        given: yup
          .string()
          .trim()
          .max(255, 'Given name is too long (255 max)'),
        surname: yup
          .string()
          .trim()
          .max(255, 'Surname is too long (255 max)'),
      }),
    })
    .test({
      name: 'at-least-one-name',
      message: 'Either given name or surname is required',
      test: async function(value) {
        const names = await person.findNameByIds([value.personNameId]);
        if (!names.length) {
          return this.createError({
            message: 'Invalid record; cannot remove',
            path: 'name',
          });
        }

        const personNames = await person.findNamesByPersonIds([
          names[0].person_id,
        ]);

        if (personNames.length < 2) {
          return this.createError({
            message: "Cannot delete a person's only name record",
            path: 'name',
          });
        }

        return true;
      },
    }),
  resolve: function removePersonNameMutation(root, { personNameId }) {
    return person
      .removeName(personNameId)
      .then(({ person_id }) => ({ removed: true, personId: person_id }));
  },
};
