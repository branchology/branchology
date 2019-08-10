import { InputGroup } from '@blueprintjs/core';
import React, { useState } from 'react';
import { debounce } from 'throttle-debounce';
import { BrowserTitle, DataContainer } from 'module/common/component/ui';
import PeopleList from '../components/PeopleList';

export default () => {
  const [search, setSearch] = useState();

  const debouncedSearch = debounce(500, setSearch);

  const onSearch = e => {
    debouncedSearch(e.target.value);
  };

  return (
    <div>
      <BrowserTitle title="Search People" />
      <h2>Search People</h2>

      <InputGroup
        leftIcon="search"
        type="search"
        name="search"
        onChange={onSearch}
      />

      <DataContainer>
        <PeopleList search={search} />
      </DataContainer>
    </div>
  );
};
