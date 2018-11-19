export default function translateApiErrors(errors) {
  const mappedErrors = {};
  for (const error of errors) {
    const key = error.field.replace('name.', '');
    if (!mappedErrors[key]) {
      mappedErrors[key] = [];
    }

    mappedErrors[key].push(error.message);
  }

  return mappedErrors;
}
