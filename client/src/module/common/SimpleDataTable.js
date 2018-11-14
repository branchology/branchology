import styled from 'styled-components';
import styledMap from 'styled-map';

const Cell = styled.td`
  text-align: ${styledMap`
    center: center;
    right: right;
    default: left;
  `};
`;

export { Cell };

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
    background-color: #e0e0e0;
  }

  .actions {
    text-align: right;
    white-space: nowrap;
  }

  tr.alt td {
    background-color: #f7f7f7;
  }

  td.citations {
    padding: 0 8px 8px 0;
  }
`;
