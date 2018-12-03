import * as yup from 'yup';
import validateCitation from 'service/validator/validateCitation';

export default {
  validationSchema: yup.object().shape({
    eventId: yup.string().required(),
    citation: validateCitation().required(),
  }),
  resolve: async function addPersonEventCitationMutation(
    root,
    { eventId, citation: { source, sourceId, ...citation } },
    context,
  ) {
    let mySourceId = sourceId;

    if (source) {
      const source = await context.dbal.source.createSource({
        title: source,
      });
      mySourceId = source.id;
    }

    return context.dbal.event
      .addSourceCitation(eventId, mySourceId, citation)
      .then(() => {
        return context.dbal.event.findById(eventId).then(event => ({ event }));
      });
  },
};
