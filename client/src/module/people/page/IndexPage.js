import React, { useState } from 'react';
import { debounce } from 'throttle-debounce';
import PeopleList from '../components/PeopleList';

export default () => {
  const [search, setSearch] = useState();

  const debouncedSearch = debounce(500, setSearch);

  const onSearch = e => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <h2>PEOPLE!</h2>
      <input type="text" name="search" onChange={onSearch} />
      <PeopleList search={search} />
    </div>
  );
};
