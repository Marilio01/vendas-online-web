import { LogoutOutlined, DesktopOutlined } from '@ant-design/icons'; 
import styled from 'styled-components';

export const HeaderContainer = styled.header`
  height: 72px;
  width: calc(100% - 240px);
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 32px;

  background-color: white;

  -webkit-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.47);
`;

export const DisplayIcon = styled(DesktopOutlined)`
  font-size: 24px;
  margin-right: 24px; // Adiciona um espaço entre os ícones
  cursor: pointer; // Mostra a mãozinha ao passar o mouse
  color: #555; // Uma cor para o ícone

  &:hover {
    color: #1890ff; // Cor ao passar o mouse
  }
`;

export const LogoExit = styled(LogoutOutlined)`
  font-size: 24px;
  cursor: pointer;
  color: #555;
  
  &:hover {
    color: #ff4d4f; // Cor vermelha para o logout
  }
`;