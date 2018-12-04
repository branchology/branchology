import * as yup from 'yup';
import validateCitation from 'service/validator/validateCitation';

export default {
  validationSchema: yup.object().shape({
    nameId: yup.string().required(),
    citation: validateCitation().required(),
  }),
  resolve: async function addPersonNameCitationMutation(
    root,
    { nameId, citation: { source, sourceId, ...citation } },
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
      .addNameSourceCitation(nameId, mySourceId, citation)
      .then(() => {
        return context.dbal.person
          .findNameById(nameId)
          .then(name => ({ name }));
      });
  },
};
