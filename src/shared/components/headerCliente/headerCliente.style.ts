import styled from 'styled-components';
import SVGLogo from '../icons/SVGLogo';
import { Input } from 'antd';

export const SearchInput = styled(Input)`
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
  background: linear-gradient(90deg, #43cea2 0%, #185a9d 100%);
  padding: 12px 32px;
  box-shadow: 0 4px 12px rgba(24, 90, 157, 0.25);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #f0f0f0;

  @media (max-width: 768px) {
    padding: 10px 16px;
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
  }
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
    background-color: darkblue;
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
