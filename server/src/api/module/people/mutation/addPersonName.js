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
      test: function(value) {
        if (!(value.name.given || value.name.surname)) {
          return this.createError({
            message: 'Either given name or surname is required',
            path: 'name.surname',
          });
        }

        return true;
      },
    }),
  resolve: function addPersonNameMutation(
    root,
    { personId, name, citations = [] },
    context,
  ) {
    return person
      .addName(personId, name)
      .then(name =>
        context.dbal.source.attachSourceCitation(
          context.dbal.person.addNameSourceCitation,
          name.id,
          citations,
        ),
      )
      .then(n => ({ name: n, personId }));
  },
};
