import * as yup from 'yup';
import validateEvent from 'service/validator/validateEvent';

export default {
  validationSchema: yup.object().shape({
    personId: yup.string().required(),
    event: validateEvent().required(),
  }),
  resolve: function addPersonEventMutation(
    root,
    { personId, event: { type, ...eventData }, citations = [] },
    context,
  ) {
    return context.dbal.event
      .createEvent(type, eventData)
      .then(event =>
        Promise.all([
          context.dbal.person.attachEvent(personId, event.id),
          context.dbal.source.attachSourceCitation(
            context.dbal.event.addSourceCitation,
            event.id,
            citations,
          ),
        ]).then(() => ({ event, personId })),
      );
  },
};
