import { isNil } from 'lodash';
import * as yup from 'yup';

export default function validateCitation() {
  return yup.object().shape({
    source: yup
      .string()
      .test('require-source', 'Source is required', function(source) {
        const { sourceId } = this.parent;
        if (!source) return !isNil(sourceId);
        return true;
      }),
    sourceId: yup.string(),
    page: yup.string(),
    citation: yup.string(),
  });
}
