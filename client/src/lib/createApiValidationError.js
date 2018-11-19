export default function createApiValidationError(errors) {
  const error = new Error('Failed to save form');
  error.validationErrors = errors;
  return error;
}
