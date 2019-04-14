import * as yup from 'yup';
import validateEvent from 'service/validator/validateEvent';

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
  validationSchema: yup.object().shape({
    personId: yup.string().required(),
    event: validateEvent().required(),
  }),
  resolve: function addPersonEventMutation(
    root,
    { personId, event: { type, ...eventData }, citations = [] },
    context,
  ) {
    return createEventCreator(context, type, eventData, citations)
      .then(event => context.dbal.person.attachEvent(personId, event.id))
      .then(event => ({ event, personId }));
  },
};
