import * as yup from 'yup';
import { updateAttribute } from 'db';

export default {
  validationSchema: yup.object().shape({
    attribute: yup.object().shape({
      data: yup
        .string()
        .trim()
        .max(255, 'Attribute data is too long (255 max)'),
      lastName: yup
        .string()
        .trim()
        .min(2, 'Last name is too short'),
      age: yup
        .number()
        .moreThan(18, 'You must be over the age of 18 to register')
        .lessThan(100, 'Are you really that old?'),
    }),
  }),
  resolve: function updateAttributeMutation(root, { id, attribute }, context) {
    // TODO: FIXME: validation
    console.log({ id, attribute });

    return updateAttribute(id, attribute).then(attr => ({ attribute: attr }));
  },
};
