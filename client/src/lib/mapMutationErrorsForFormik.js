export function mapMutationErrorsForFormik(errors, stripKey = '') {
  const newErrors = {};
  for (const error of errors) {
    const formattedKey = error.field.replace(stripKey, '');
    if (!(formattedKey in newErrors)) {
      newErrors[formattedKey] = error.message.replace(stripKey, '');
    } else {
      newErrors[formattedKey] += ` ${error.message.replace(stripKey, '')}`;
    }
  }

  return newErrors;
}
