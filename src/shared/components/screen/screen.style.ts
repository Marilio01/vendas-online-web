import styled from 'styled-components';

export const ScreenContainer = styled.div`
  background-color: white;
  padding: 32px;
  margin: 32px;
  width: calc(100% - 368px);
  margin-left: auto;

  @media (max-width: 768px) {
    padding: 16px;
    margin: 16px 16px 16px 16px; 
    width: calc(100% - 32px);
    margin-left: initial;
  }
`;