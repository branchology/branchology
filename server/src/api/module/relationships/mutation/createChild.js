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
  resolve: function createChildMutation(
    root,
    {
      relationshipId,
      name,
      lineage,
      birth = {},
      death = {},
      sex,
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
      .then(child => {
        const promises = [];

        if (birth.date || birth.place || birth.placeId) {
          promises.push(
            createEventCreator(context, 'BIRT', birth, citations).then(event =>
              context.dbal.person.attachEvent(child.id, event.id),
            ),
          );
        }

        if (death.date || death.place || death.placeId) {
          promises.push(
            createEventCreator(context, 'DEAT', death, citations).then(event =>
              context.dbal.person.attachEvent(child.id, event.id),
            ),
          );
        }

        return Promise.all([
          context.dbal.relationship
            .attachChild(relationshipId, child.id, lineage)
            .then(() => ({
              person: child,
              relationshipId,
            })),
          ...promises,
        ]).then(([returnValue]) => returnValue);
      });
  },
};
