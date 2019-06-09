export default function makePersonEventPreferred(root, { eventId }, context) {
  return context.dbal.person
    .setPersonEventPreferred(eventId)
    .then(event =>
      context.dbal.person.findById(event.personId).then(person => ({ person })),
    );
}
