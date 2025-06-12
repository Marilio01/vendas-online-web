import styled from 'styled-components';
import { Card, Button } from 'antd';

export const Container = styled.div`
  padding: 24px;
  background-color: #f9f9f9;
  min-height: 100vh;
`;

export const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const StyledCard = styled(Card)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
  cursor: default;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .ant-card-cover {
    height: 280px; 
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }

  .ant-card-cover img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
`;

export const ProductName = styled.h3`
  margin: 12px 0 6px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const ProductPrice = styled.p`
  font-size: 22px;
  font-weight: 700;
  color: #1890ff;
  margin: 0 0 12px 0;
  text-align: center;
  width: 100%;
`;

export const AddCartButton = styled(Button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #1890ff !important;
  border: none !important;
  border-radius: 4px !important;
  font-weight: 600;
  color: white !important;
  cursor: default;

  .anticon {
    font-size: 18px;
  }
`;
