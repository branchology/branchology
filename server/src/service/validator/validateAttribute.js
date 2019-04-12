import { isNil } from 'lodash';
import * as yup from 'yup';
import { validateGedcomDate } from './lib';

export default function validateAttribute() {
  return yup.object().shape({
    type: yup.string().required(),
    date: yup
      .string()
      .test('validate-date', 'Date is invalid', function(value) {
        return isNil(value) || validateGedcomDate(value);
      }),
    place: yup.string(),
    placeId: yup.string(),
  });

  // const errors = {};

  // if (isNil(event.type)) {
  //   errors.type = ['Type is required'];
  // }

  // if (!isNil(event.date) && !validateGedcomDate(event.date)) {
  //   errors.date = ['Date is invalid'];
  // }

  // return errors;
}
