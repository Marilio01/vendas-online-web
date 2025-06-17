import styled, { css } from 'styled-components';
import SVGLogo from '../icons/SVGLogo';
import { Button, Input, Space } from 'antd';
import { SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const hideOnMobile = css`
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SearchInput = styled(Input.Search)`
  width: 100%;
  max-width: 450px;
  ${hideOnMobile}
`;

export const MobileSearchIcon = styled(Button)`
  display: none;
  background: transparent;
  border: none;
  color: #f0f0f0;
  font-size: 22px;

  &:hover {
    background: transparent;
    color: #1890ff;
  }

  @media (max-width: 768px) {
    display: inline-block;
  }
`;

export const MobileSearchContainer = styled.div`
  background-color: #002140;
  padding: 10px 16px;
  animation: slideDown 0.3s ease-in-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  flex-wrap: nowrap;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 10px 16px;
  }
`;

export const AdminButton = styled(Button)`
  background: linear-gradient(45deg, #1890ff, #0050b3);
  border: none;
  color: white;

  .admin-text {
    margin-left: 8px;
  }

  &:hover {
    background: linear-gradient(45deg, #40a9ff, #1890ff);
    box-shadow: 0 0 8px rgba(24, 144, 255, 0.5);
  }

  .admin-text {
    ${hideOnMobile}
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
  cursor: pointer;

  @media (max-width: 768px) {
    gap: 8px;
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
`;

export const LogoText = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #f0f0f0;
  margin: 0;
  ${hideOnMobile}
`;

export const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 0;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

export const AdminPanelIcon = styled(SettingOutlined)`
  font-size: 26px;
  color: #f0f0f0;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;

  &:hover {
    color: #ffc107;
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

export const CartIcon = styled.div`
  font-size: 26px;
  color: #f0f0f0;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #32e0c4;
  }

  @media (max-width: 768px) {
    font-size: 22px;
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
    ${hideOnMobile}
  }

  svg {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
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
  gap: 8px;
`;

export const QuantityControl = styled(Space)`
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 2px;
`;