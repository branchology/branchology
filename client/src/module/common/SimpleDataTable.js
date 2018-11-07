import styled from 'styled-components';

export default styled.table`
  border-collapse: collapse;
  width: 100%;

  th {
    font-weight: 500;
    padding: 8px;
    text-align: left;
  }

  td {
    padding: 8px;
  }

  thead tr {
    background-color: #eee;
  }

  .actions {
    text-align: right;
    white-space: nowrap;
  }
`;
