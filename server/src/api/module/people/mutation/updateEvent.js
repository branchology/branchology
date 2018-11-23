import * as yup from 'yup';
import validateEvent from 'service/validator/validateEvent';

export default {
  validationSchema: yup.object().shape({
    id: yup.string().required(),
    event: validateEvent().required(),
  }),
  resolve: function updateEventMutation(
    root,
    { id, event, citations = [] },
    context,
  ) {
    return context.dbal.event.updateEvent(id, event).then(event => ({ event }));
  },
};
