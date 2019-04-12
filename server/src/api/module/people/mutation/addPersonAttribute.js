import * as yup from 'yup';
import validateAttribute from 'service/validator/validateAttribute';

export default {
  validationSchema: yup.object().shape({
    personId: yup.string().required(),
    attribute: validateAttribute().required(),
  }),
  resolve: function addPersonAttributeMutation(
    root,
    { personId, attribute: attributeData, citations = [] },
    context,
  ) {
    return context.dbal.person
      .createAttribute(personId, attributeData)
      .then(attribute => {
        return Promise.all(
          citations.map(async ({ source, sourceId, ...citation }) => {
            let mySourceId = sourceId;

            if (source) {
              const source = await context.dbal.source.create({
                title: source,
              });
              mySourceId = source.id;
            }

            return context.dbal.person.addPersonAttributeSourceCitation(
              attribute.id,
              mySourceId,
              citation,
            );
          }),
        ).then(() => ({ attribute, personId }));
      });
  },
};
