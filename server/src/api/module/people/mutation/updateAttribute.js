import * as yup from 'yup';

export default {
  // TODO: FIXME: validation
  validationSchema: yup.object().shape({
    attribute: yup.object().shape({
      data: yup
        .string()
        .trim()
        .max(255, 'Attribute data is too long (255 max)'),
    }),
  }),
  resolve: function updateAttributeMutation(root, { id, attribute }, context) {
    return context.dbal.event
      .updateAttribute(id, attribute)
      .then(attr => ({ attribute: attr }));
  },
};
