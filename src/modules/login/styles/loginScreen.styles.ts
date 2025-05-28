import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const ContainerLoginScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 16px;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  filter: brightness(0.6);
`;

export const TitleLogin = styled(Title)`
  color: #004d73;
  font-size: 32px !important;
  font-weight: 600 !important;
  margin-bottom: 32px;
  text-align: center;
`;

export const ContainerLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9); // fundo translúcido
  padding: 40px 32px;
  width: 100%;
  max-width: 460px;
  margin-right: 48px;
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    margin-right: 0;
  }
`;

export const LimitedContainer = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterLinkText = styled.p`
  font-size: 14px;
  text-align: center;
  color: #555;

  a {
    color: #1890ff;
    text-decoration: underline;
  }
`;