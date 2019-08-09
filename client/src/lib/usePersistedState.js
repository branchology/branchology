import { useEffect, useState } from 'react';

export function usePersistedState(key) {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
