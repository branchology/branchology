import * as yup from 'yup';

export default {
  validationSchema: yup.object().shape({
    eventId: yup.string().required(),
    citationId: yup.string().required(),
  }),
  resolve: function removePersonEventCitationMutation(
    root,
    { eventId, citationId },
    context,
  ) {
    return context.dbal.source.deleteCitation(citationId).then(() => {
      return context.dbal.event.findById(eventId).then(event => ({ event }));
    });
  },
};
