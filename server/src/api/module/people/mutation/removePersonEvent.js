export default function removePersonEventMutation(root, { eventId }, context) {
  return context.dbal.person.removeEvent(eventId).then(({ personId }) => {
    return { removed: true, personId };
  });
}
