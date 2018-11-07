import * as yup from 'yup';
import { updateAttribute } from 'db';

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
    return updateAttribute(id, attribute).then(attr => ({ attribute: attr }));
  },
};
