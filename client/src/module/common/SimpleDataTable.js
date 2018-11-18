import styled from 'styled-components';
import styledMap from 'styled-map';

const textAlign = styledMap`
  center: center;
  right: right;
  default: left;
`;

const Cell = styled.td`
  text-align: ${textAlign};
`;

const Heading = styled.td`
  font-weight: 500;
  padding: 8px;
  text-align: ${textAlign};
`;

export { Cell, Heading };

export default styled.table`
  border-collapse: collapse;
  width: 100%;

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
