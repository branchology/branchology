import { useState } from 'react';

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  return [value, () => setValue(!value)];
}
