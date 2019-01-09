import * as yup from 'yup';
import validateEvent from 'service/validator/validateEvent';

export default {
  validationSchema: yup.object().shape({
    relationshipId: yup.string().required(),
    event: validateEvent().required(),
  }),
  resolve: function addPersonEventMutation(
    root,
    { relationshipId, event: { type, ...eventData }, citations = [] },
    context,
  ) {
    return context.dbal.event.createEvent(type, eventData).then(event => {
      return Promise.all([
        context.dbal.relationship.attachEvent(relationshipId, event.id),
        ...citations.map(async ({ source, sourceId, ...citation }) => {
          let mySourceId = sourceId;

          if (source) {
            const source = await context.dbal.source.createSource({
              title: source,
            });
            mySourceId = source.id;
          }

          return context.dbal.event.addSourceCitation(
            event.id,
            mySourceId,
            citation,
          );
        }),
      ]).then(() => ({ event }));
    });
  },
};
