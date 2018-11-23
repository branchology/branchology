export default function translateApiErrors(errors, field) {
  const mappedErrors = {};
  for (const error of errors) {
    const key = error.field.replace(`${field}.`, '');
    if (!mappedErrors[key]) {
      mappedErrors[key] = [];
    }

    mappedErrors[key].push(error.message);
  }

  return mappedErrors;
}
