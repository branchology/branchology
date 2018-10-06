import * as yup from 'yup';
import { addEventSourceCitation, createAttribute, createSource } from 'db';

export default {
  // TODO: FIXME:
  validationSchema: yup.object(),
  resolve: function addPersonAttributeMutation(
    root,
    { personId, attribute: attributeData, citations = [] },
  ) {
    return createAttribute(personId, attributeData).then(attribute => {
      return Promise.all(
        citations.map(async ({ source, sourceId, ...citation }) => {
          let mySourceId = sourceId;

          if (source) {
            const source = await createSource({ title: source });
            mySourceId = source.id;
          }

          return addEventSourceCitation(
            attribute.event_id,
            mySourceId,
            citation,
          );
        }),
      ).then(() => ({ attribute }));
    });
  },
};
