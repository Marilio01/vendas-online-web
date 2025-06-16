import styled from 'styled-components';
import { Card, Button, Typography } from 'antd';

export const Container = styled.div`
  width: 100%;
  padding: 24px 48px;
  background-color: #f0f2f5;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const CategorySection = styled.section`
  background-color: #ffffff;
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const CategoryTitle = styled(Typography.Title)`
  &.ant-typography {
    margin-bottom: 24px !important;
    font-size: 26px !important;
    font-weight: 700 !important;
    color: #1f1f1f;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
`;

export const StyledCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: default;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }

  .ant-card-cover {
    height: 250px; 
    padding: 16px;
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
    padding: 20px;
    text-align: center;
  }
`;

export const ProductName = styled.h3`
  margin: 12px 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #3a3a3a;
  height: 48px; 
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #0050b3;
  margin: 0 0 16px 0;
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