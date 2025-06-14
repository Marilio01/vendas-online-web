import styled from 'styled-components';
import SVGLogo from '../icons/SVGLogo';
import { Button, Input } from 'antd';
import { SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons'; 

export const SearchInput = styled(Input.Search)`
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    max-width: 200px;
  }

  @media (max-width: 480px) {
    max-width: 180px;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #001529;
  padding: 12px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: rgba(255, 255, 255, 0.85);

  @media (max-width: 768px) {
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
`;

export const AdminButton = styled(Button)`
  background: linear-gradient(45deg, #1890ff, #0050b3);
  border: none;
  color: white;

  &:hover {
    background: linear-gradient(45deg, #40a9ff, #1890ff);
    box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
  }
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 20px;
`;

export const EmptyCartIcon = styled(ShoppingCartOutlined)`
  font-size: 48px;
  color: #ccc;
  margin-bottom: 16px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 0;
  }
`;

export const LogoWrapper = styled(SVGLogo)`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

export const LogoText = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #f0f0f0;
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  input {
    max-width: 450px;
  }

  @media (max-width: 768px) {
    input {
      max-width: 280px;
    }
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const AdminPanelIcon = styled(SettingOutlined)`
  font-size: 26px;
  color: #f0f0f0;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #ffc107; // Uma cor de destaque, como amarelo
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const CartIcon = styled.div`
  font-size: 26px;
  color: #f0f0f0;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
  position: relative;

  &:hover {
    color: #32e0c4;
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const CartBadge = styled.span`
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 12px;
  padding: 0 6px;
  position: absolute;
  top: -5px;
  right: -10px;
`;

export const UserInfo = styled.div`
  display: flex;
  color: #f0f0f0;
  align-items: center;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .text-hover {
    margin: 0 6px;
    color: #f0f0f0;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  svg {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;
