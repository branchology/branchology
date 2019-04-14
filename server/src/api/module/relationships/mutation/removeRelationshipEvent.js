export default function removeRelationshipEventMutation(
  root,
  { eventId },
  context,
) {
  return context.dbal.relationship
    .removeEvent(eventId)
    .then(({ relationship_id }) => ({
      removed: true,
      relationshipId: relationship_id,
    }));
}
