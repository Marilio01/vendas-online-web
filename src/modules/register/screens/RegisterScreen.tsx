import { useEffect } from 'react';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
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
    errors,
    disabledButton,
    handleCancelInsert,
    handleInsertUser,
    handleOnChangeInput,
    handleOnBlur,
    loading,
  } = useRegister();

  useEffect(() => {
    document.title = 'Cadastro';
  }, []);

  return (
    <ScreenContainer>
      <LimitedContainer width={400}>
        <TitleLogin>Cadastro de Usuário</TitleLogin>

        <Input
          title="Nome Completo"
          placeholder="Nome Completo"
          value={user.name}
          onChange={(event) => handleOnChangeInput(event, 'name')}
          onBlur={(event) => handleOnBlur(event, 'name')}
          margin="0px 0px 16px 0px"
          errorMessage={errors?.name}
        />

        <Input
          title="Telefone (apenas números)"
          placeholder="Ex: 81999999999"
          value={user.phone}
          onChange={(event) => handleOnChangeInput(event, 'phone')}
          onBlur={(event) => handleOnBlur(event, 'phone')}
          margin="0px 0px 16px 0px"
          type="tel"
          maxLength={11}
          errorMessage={errors?.phone}
        />

        <Input
          title="Email"
          placeholder="email@email.com"
          value={user.email}
          onChange={(event) => handleOnChangeInput(event, 'email')}
          onBlur={(event) => handleOnBlur(event, 'email')}
          margin="0px 0px 16px 0px"
          type="email"
          errorMessage={errors?.email}
        />

        <Input
          title="CPF (apenas números)"
          placeholder="00000000000"
          value={user.cpf}
          onChange={(event) => handleOnChangeInput(event, 'cpf')}
          onBlur={(event) => handleOnBlur(event, 'cpf')}
          margin="0px 0px 16px 0px"
          type="tel"
          maxLength={11}
          errorMessage={errors?.cpf}
        />

        <Input
          title="Senha"
          placeholder="Senha"
          value={user.password}
          onChange={(event) => handleOnChangeInput(event, 'password')}
          onBlur={(event) => handleOnBlur(event, 'password')}
          margin="0px 0px 16px 0px"
          type="password"
          errorMessage={errors?.password}
        />

        <ButtonsContainer>
          <Button onClick={handleCancelInsert} danger>
            Cancelar
          </Button>
          <Button loading={loading} disabled={disabledButton} onClick={handleInsertUser} type="primary">
            Cadastrar Usuário
          </Button>
        </ButtonsContainer>
      </LimitedContainer>
    </ScreenContainer>
  );
};

export default RegisterScreen;