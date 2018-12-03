import * as yup from 'yup';

export default {
  validationSchema: yup.object().shape({
    attributeId: yup.string().required(),
    citationId: yup.string().required(),
  }),
  resolve: function removePersonAttributeCitationMutation(
    root,
    { attributeId, citationId },
    context,
  ) {
    return context.dbal.source.deleteCitation(citationId).then(() => {
      return context.dbal.person
        .findAttributeById(attributeId)
        .then(attribute => ({ attribute }));
    });
  },
};
