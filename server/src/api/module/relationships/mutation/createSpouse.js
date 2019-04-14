import * as yup from 'yup';

function createEventCreator(context, type, eventData, citations) {
  return context.dbal.event
    .createEvent(type, eventData)
    .then(event =>
      Promise.all([
        context.dbal.source.attachSourceCitation(
          context.dbal.event.addSourceCitation,
          event.id,
          citations,
        ),
      ]).then(() => event),
    );
}

export default {
  // TODO: FIXME: validation
  validationSchema: yup.object(),
  resolve: function createSpouseMutation(
    root,
    {
      personId,
      name,
      sex,
      birth = {},
      death = {},
      marriage = {},
      citations = [],
    },
    context,
  ) {
    const { given, surname } = name;

    return context.dbal.person
      .create({
        sex,
        given,
        surname,
      })
      .then(spouse => {
        const promises = [];

        if (birth.date || birth.place || birth.placeId) {
          promises.push(
            createEventCreator(context, 'BIRT', birth, citations).then(event =>
              context.dbal.person.attachEvent(spouse.id, event.id),
            ),
          );
        }

        if (death.date || death.place || death.placeId) {
          promises.push(
            createEventCreator(context, 'DEAT', death, citations).then(event =>
              context.dbal.person.attachEvent(spouse.id, event.id),
            ),
          );
        }

        return Promise.all([
          context.dbal.relationship
            .create(personId, spouse.id)
            .then(relationship => {
              if (marriage.date || marriage.place || marriage.placeId) {
                return createEventCreator(context, 'MARR', marriage, citations)
                  .then(event =>
                    context.dbal.relationship.attachEvent(
                      relationship.id,
                      event.id,
                    ),
                  )
                  .then(() => relationship);
              }

              return Promise.resolve(relationship);
            })
            .then(relationship => ({
              relationship,
              personId,
            })),
          ...promises,
        ]).then(([returnValue]) => returnValue);
      });
  },
};
