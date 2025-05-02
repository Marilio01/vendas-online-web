import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
} from '../styles/loginScreen.styles';

const LoginScreen = () => {
  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo.jpg" />
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background.jpg" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
