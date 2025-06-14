import styled from 'styled-components';
import { Card } from 'antd';

export const PaymentContainer = styled.div`
  padding: 40px 20px;
  max-width: 700px;
  margin: 40px auto;
`;

export const PaymentCard = styled(Card)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 32px;
`;