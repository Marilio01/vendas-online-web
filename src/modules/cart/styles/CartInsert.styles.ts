import styled from 'styled-components';
import { Button } from 'antd';

export const CartInsertContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  min-width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    min-width: 100%;
  }
`;
