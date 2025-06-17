import styled from 'styled-components';
import { Typography, Space } from 'antd';

export const CheckoutContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const CheckoutTitle = styled(Typography.Title)`
  text-align: center;
  margin-bottom: 40px !important;
`;

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const ProductInfo = styled.div`
  flex: 1;
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const QuantityControl = styled(Space)`
  background-color: #f7f7f7;
  padding: 4px;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
`;

export const ItemTotalPrice = styled(Typography.Text)`
  font-size: 1.1em;
  font-weight: 600;
  width: 100px;
  text-align: right;
`;