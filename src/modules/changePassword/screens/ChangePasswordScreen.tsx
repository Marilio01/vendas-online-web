import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import { useChangePassword } from '../hooks/ChangePassword';
import { Container, Title, Form, ButtonsContainer } from '../styles/changePassword.styles';
import Breadcrumb from '../../../shared/components/breadcrumb/Breadcrumb'; // 1. IMPORTE O NOVO COMPONENTE
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';

const ChangePasswordScreen = () => {
  const {
    form,
    loading,
    errors,
    disabledButton,
    handleOnChangeInput,
    handleChangePassword,
    handleOnBlur,
    handleCancel,
  } = useChangePassword();

  return (
    <>
    <HeaderCliente />
    <Container>
      <Breadcrumb
        listBreadcrumb={[
          { name: 'Home', navigateTo: '/display' },
          { name: 'Alterar Senha' },
        ]}
      />
      <Form>
        <Title>Alterar Senha</Title>
        <Input
          title="Senha Atual"
          type="password"
          placeholder="Senha Atual"
          value={form.lastPassword}
          onChange={(e) => handleOnChangeInput(e, 'lastPassword')}
          onBlur={() => handleOnBlur('lastPassword')}
          errorMessage={errors.lastPassword}
        />
        <Input
          title="Nova Senha"
          type="password"
          placeholder="Nova Senha"
          value={form.newPassword}
          onChange={(e) => handleOnChangeInput(e, 'newPassword')}
          onBlur={() => handleOnBlur('newPassword')}
          errorMessage={errors.newPassword}
        />
        <Input
          title="Confirmar Nova Senha"
          type="password"
          placeholder="Confirme a Nova Senha"
          value={form.confirmPassword}
          onChange={(e) => handleOnChangeInput(e, 'confirmPassword')}
          onBlur={() => handleOnBlur('confirmPassword')}
          errorMessage={errors.confirmPassword}
        />

        <ButtonsContainer>
          <Button onClick={handleCancel} disabled={loading} danger>
            Cancelar
          </Button>
          <Button
            onClick={handleChangePassword}
            disabled={disabledButton || loading}
            loading={loading}
            type="primary"
          >
            Alterar Senha
          </Button>
        </ButtonsContainer>
      </Form>
    </Container>
    </>
  );
};

export default ChangePasswordScreen;