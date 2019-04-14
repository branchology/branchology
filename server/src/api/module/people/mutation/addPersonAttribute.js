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
      .then(attribute =>
        context.dbal.source
          .attachSourceCitation(
            context.dbal.person.addAttributeSourceCitation,
            attribute.id,
            citations,
          )
          .then(() => ({ attribute, personId })),
      );
  },
};
