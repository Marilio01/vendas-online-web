import Loading from '../../../shared/components/loading/Loading';
import { Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { useAdmin } from '../hooks/useAdmin';
import {
  DisplayFlexJustifyBetween,
  DisplayFlexJustifyCenter,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import Table from '../../../shared/components/table/Table';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { UserType } from '../../login/types/UserType';
import { useMemo } from 'react';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import { getUserInfoByToken } from '../../../shared/functions/connection/auth';
import { useNavigate } from 'react-router-dom';
import { AdminRoutesEnum } from '../routes';

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
          <DisplayFlexJustifyBetween margin="0px 0px 16px 0px">
            <LimitedContainer width={240}>
              <Search placeholder="Buscar Adiministrador" onSearch={handleOnChangeSearch} enterButton />
            </LimitedContainer>
            <LimitedContainer width={180}>
              {userToken?.typeUser === UserTypeEnum.Root && (
                <Button type="primary" onClick={handleGoToInsertAdmin}>
                  Inserir Admin
                </Button>
              )}
            </LimitedContainer>
          </DisplayFlexJustifyBetween>
          <Table columns={columns} dataSource={users} />
        </>
      )}
    </Screen>
  );
};

export default Admin;
