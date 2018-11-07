import styled from 'styled-components';

export default styled.div`
  background-color: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 3px;
  padding: 10px;

  & + & {
    margin-top: 10px;
  }

  .header {
    align-items: center;
    display: flex;
    margin-bottom: 10px;

    .sectionTitle {
      flex: 1;
      font-weight: 500;
      margin: 0;
    }
  }

  & + .sectionTitle {
    margin-bottom: 40px;
  }
`;
