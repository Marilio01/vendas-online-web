import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import { useEffect } from 'react';
import { useRegister } from '../hooks/useRegister';
import {
  LimitedContainer,
  TitleLogin,
  ScreenContainer,
  ButtonsContainer,
} from '../styles/registerScreen.styles';

const RegisterScreen = () => {
  const {
    user,
    disabledButton,
    handleCancelInsert,
    handleInsertUser,
    handleOnChangeInput,
  } = useRegister();

  useEffect(() => {
    document.title = 'Cadastro';
  }, []);

  return (
    <ScreenContainer>
      <LimitedContainer width={400}>
        <TitleLogin>Cadastro de Usuário</TitleLogin>

        <Input
          value={user.name}
          onChange={(event) => handleOnChangeInput(event, 'name')}
          margin="0px 0px 16px 0px"
          title="Nome"
          placeholder="Nome"
        />

        <Input
          value={user.phone}
          onChange={(event) => handleOnChangeInput(event, 'phone')}
          margin="0px 0px 16px 0px"
          title="Telefone"
          placeholder="Telefone"
        />

        <Input
          value={user.email}
          onChange={(event) => handleOnChangeInput(event, 'email')}
          margin="0px 0px 16px 0px"
          title="Email"
          placeholder="Email"
        />

        <Input
          value={user.cpf}
          onChange={(event) => handleOnChangeInput(event, 'cpf')}
          margin="0px 0px 16px 0px"
          title="Cpf"
          placeholder="Cpf"
        />

        <Input
          value={user.password}
          onChange={(event) => handleOnChangeInput(event, 'password')}
          margin="0px 0px 16px 0px"
          title="Password"
          placeholder="Password"
        />

        <ButtonsContainer>
          <Button onClick={handleCancelInsert} danger>
            Cancelar
          </Button>
          <Button disabled={disabledButton} onClick={handleInsertUser} type="primary">
            Cadastrar Usuário
          </Button>
        </ButtonsContainer>
      </LimitedContainer>
    </ScreenContainer>
  );
};

export default RegisterScreen;