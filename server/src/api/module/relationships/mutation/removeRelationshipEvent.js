export default function removeRelationshipEventMutation(
  root,
  { eventId },
  context,
) {
  return context.dbal.relationship
    .removeEvent(eventId)
    .then(({ relationshipId }) => ({
      removed: true,
      relationshipId,
    }));
}
