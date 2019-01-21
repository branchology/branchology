import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'throttle-debounce';
import { components } from 'module/common';
import PeopleList from '../components/PeopleList';

const {
  ui: { BrowserTitle },
} = components;

const SearchInput = styled.input`
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  margin-bottom: 20px;
  padding: 10px;
  width: 320px;
`;

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

      <SearchInput type="text" name="search" onChange={onSearch} />

      <PeopleList search={search} />
    </div>
  );
};
