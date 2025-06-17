import Loading from '../../../shared/components/loading/Loading';
import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { useAdmin } from '../hooks/useAdmin';
import {
  DisplayFlexJustifyCenter,
} from '../../../shared/components/styles/display.styled';
import Table from '../../../shared/components/table/Table';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { UserType } from '../../login/types/UserType';
import { useMemo } from 'react';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { useNavigate } from 'react-router-dom';
import { AdminRoutesEnum } from '../routes';
import { MobileInsertButton, MobileSearchInput, ProductSearchAndButtonContainer } from '../../../shared/components/styles/mobile.styled';

const { Search } = Input;

const columns: ColumnsType<UserType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <a>{insertMaskInPhone(text)}</a>,
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
    render: (text) => <a>{insertMaskInCpf(text)}</a>,
  },
];

const Admin = () => {
  const { users, loading, handleOnChangeSearch } = useAdmin();
  const navigate = useNavigate();

  const userToken = useMemo(() => getUserInfoByToken(), []);

  const handleGoToInsertAdmin = () => {
    navigate(AdminRoutesEnum.ADMIN_INSERT);
  };

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'ADMINISTRADORES',
        },
      ]}
    >
      {loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <ProductSearchAndButtonContainer>
            <MobileSearchInput> {/* Correctly placed MobileSearchInput */}
              <Search placeholder="Buscar Administrador" onSearch={handleOnChangeSearch} enterButton />
            </MobileSearchInput>
            <MobileInsertButton> {/* Correctly placed MobileInsertButton */}
              {userToken?.typeUser === UserTypeEnum.Root && (
                <Button type="primary" onClick={handleGoToInsertAdmin}>
                  Inserir Admin
                </Button>
              )}
            </MobileInsertButton>
          </ProductSearchAndButtonContainer>
          <Table columns={columns} dataSource={users} />
        </>
      )}
    </Screen>
  );
};

export default Admin;