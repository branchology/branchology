export default function removePersonEventMutation(root, { eventId }, context) {
  return context.dbal.person
    .removeEvent(eventId)
    .then(() => ({ removed: true }));
}
