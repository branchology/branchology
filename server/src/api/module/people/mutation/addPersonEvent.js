import * as yup from 'yup';
import {
  addEventSourceCitation,
  attachPersonEvent,
  createEvent,
  createSource,
} from 'db';

export default {
  // TODO: FIXME:
  validationSchema: yup.object(),
  resolve: function addPersonEventMutation(
    root,
    { personId, event: { type, ...eventData }, citations = [] },
  ) {
    return createEvent(type, eventData).then(event => {
      return Promise.all([
        attachPersonEvent(personId, event.id),
        ...citations.map(async ({ source, sourceId, ...citation }) => {
          let mySourceId = sourceId;

          if (source) {
            const source = await createSource({ title: source });
            mySourceId = source.id;
          }

          return addEventSourceCitation(event.id, mySourceId, citation);
        }),
      ]).then(() => ({ event }));
    });
  },
};
