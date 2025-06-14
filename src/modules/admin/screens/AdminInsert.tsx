import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useAdminInsert } from '../hooks/useAdminInsert';
import { AdminRoutesEnum } from '../routes';

const AdminInsert = () => {
  const {
    user,
    disabledButton,
    errors,
    handleCancelInsert,
    handleInsertAdmin,
    handleOnChangeInput,
    handleOnBlur,
    loading,
  } = useAdminInsert();

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'ADMINISTRADORES', navigateTo: AdminRoutesEnum.ADMIN },
        { name: 'INSERIR' },
      ]}
    >
      <DisplayFlexJustifyCenter>
        <LimitedContainer width={400}>
          <Input
            title="Nome"
            placeholder="Nome"
            value={user.name}
            onChange={(event) => handleOnChangeInput(event, 'name')}
            onBlur={(event) => handleOnBlur(event, 'name')}
            margin="0px 0px 16px 0px"
            errorMessage={errors?.name}
          />
          <Input
            title="Telefone"
            placeholder="Telefone"
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
            placeholder="Email"
            value={user.email}
            onChange={(event) => handleOnChangeInput(event, 'email')}
            onBlur={(event) => handleOnBlur(event, 'email')}
            margin="0px 0px 16px 0px"
            type="email"
            errorMessage={errors?.email}
          />
          <Input
            title="CPF"
            placeholder="CPF (apenas números)"
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

          <DisplayFlexJustifyRight>
            <LimitedContainer margin="0px 8px" width={120}>
              <Button onClick={handleCancelInsert} danger>
                Cancelar
              </Button>
            </LimitedContainer>
            <LimitedContainer width={120}>
              <Button loading={loading} disabled={disabledButton} onClick={handleInsertAdmin} type="primary">
                Inserir
              </Button>
            </LimitedContainer>
          </DisplayFlexJustifyRight>
        </LimitedContainer>
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default AdminInsert;