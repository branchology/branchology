import * as yup from 'yup';
import validateCitation from 'service/validator/validateCitation';

export default {
  validationSchema: yup.object().shape({
    attributeId: yup.string().required(),
    citation: validateCitation().required(),
  }),
  resolve: async function addPersonAttributeCitationMutation(
    root,
    { attributeId, citation: { source, sourceId, ...citation } },
    context,
  ) {
    let mySourceId = sourceId;

    if (source) {
      const source = await context.dbal.source.createSource({
        title: source,
      });
      mySourceId = source.id;
    }

    return context.dbal.person
      .addAttributeSourceCitation(attributeId, mySourceId, citation)
      .then(() => {
        return context.dbal.person
          .findAttributeById(attributeId)
          .then(attribute => ({ attribute }));
      });
  },
};
