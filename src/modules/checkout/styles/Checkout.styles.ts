import styled from 'styled-components';
import { Typography, Space } from 'antd';

export const CheckoutContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 576px) {
    padding: 24px 12px;
  }
`;

export const CheckoutTitle = styled(Typography.Title)`
  text-align: center;
  margin-bottom: 40px !important;
`;

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 16px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
  margin-bottom: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductInfo = styled.div`
  flex: 1;
  min-width: 200px;

  .ant-avatar-square img {
    object-fit: contain;
  }
`;

export const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }
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

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;

  button {
    width: 100%;
    height: auto;
    line-height: 1.5;
    white-space: normal;
  }
`;