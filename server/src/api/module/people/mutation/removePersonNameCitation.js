import * as yup from 'yup';

export default {
  validationSchema: yup.object().shape({
    nameId: yup.string().required(),
    citationId: yup.string().required(),
  }),
  resolve: function removePersonNameCitationMutation(
    root,
    { nameId, citationId },
    context,
  ) {
    return context.dbal.source.deleteCitation(citationId).then(() => {
      return context.dbal.person.findNameById(nameId).then(name => ({ name }));
    });
  },
};
