import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import { useChangePassword } from '../hooks/ChangePassword';
import { Container, Title, Form } from '../styles/changePassword.styles';

export const ChangePasswordScreen = () => {
  const {
    form,
    loading,
    disabledButton,
    handleOnChangeInput,
    handleChangePassword,
    handleCancel,
  } = useChangePassword();

  return (
    <Container>
      <Title>Alterar Senha</Title>
      <Form>
        <Input
          type="password"
          placeholder="Senha Atual"
          value={form.lastPassword}
          onChange={(e) => handleOnChangeInput(e, 'lastPassword')}
        />
        <Input
          type="password"
          placeholder="Nova Senha"
          value={form.newPassword}
          onChange={(e) => handleOnChangeInput(e, 'newPassword')}
        />

        <Button
          onClick={handleChangePassword}
          disabled={disabledButton}
          type="primary"
        >
          Alterar Senha
        </Button>

        <Button
          onClick={handleCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
      </Form>
    </Container>
  );
};
