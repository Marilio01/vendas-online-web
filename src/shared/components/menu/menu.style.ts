import { Button, Typography } from 'antd';
import styled, { css } from 'styled-components';

const { Text } = Typography;

const hideOnSmallMobile = css`
  @media (max-width: 360px)
    display: none;
  }
`;

export const ContainerMenu = styled.div<{ $isMobileMenuVisible?: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #001529;
  width: 240px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    transform: ${({ $isMobileMenuVisible }) =>
      $isMobileMenuVisible ? 'translateX(0)' : 'translateX(-100%)'};
  }
`;

export const ContainerLogoName = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 16px;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 4px;
  }

  @media (max-width: 360px) {
    gap: 0;
  }
`;

export const LogoMenu = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  @media (max-width: 420px) {
    svg {
      display: none; 
    }
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const NameCompany = styled(Text)<{ $isMobileMenuVisible?: boolean }>`
  color: white;
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;

  @media (max-width: 420px) {
    max-width: 100px
  }

  ${hideOnSmallMobile}
`;

export const ToggleMenuButton = styled(Button)`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 15px;
    left: 15px;
    z-index: 1001;
    color: white;
    background-color: #001529;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

    &:hover,
    &:focus {
      background-color: rgba(22, 119, 255, 0.1);
      border-color: #1677ff;
      color: #1677ff;
    }
  }
`;

export const Overlay = styled.div<{ $isMobileMenuVisible?: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isMobileMenuVisible }) => ($isMobileMenuVisible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;