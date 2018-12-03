import * as yup from 'yup';
import validateCitation from 'service/validator/validateCitation';

export default {
  validationSchema: yup.object().shape({
    id: yup.string().required(),
    citation: validateCitation().required(),
  }),
  resolve: async function updateCitationMutation(
    root,
    { id, citation: { source, sourceId, ...citation } },
    context,
  ) {
    let mySourceId = sourceId;

    if (source) {
      const source = await context.dbal.source.createSource({
        title: source,
      });
      mySourceId = source.id;
    }

    return context.dbal.source
      .updateSourceCitation(id, { source_id: mySourceId, ...citation })
      .then(citation => ({
        citation,
      }));
  },
};
