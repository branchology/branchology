export default function removePersonEventMutation(root, { eventId }, context) {
  return context.dbal.person.removeEvent(eventId).then(({ person_id }) => {
    return { removed: true, personId: person_id };
  });
}
