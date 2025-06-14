import { useEffect, useState } from 'react';
import { Card, Descriptions, Typography } from 'antd';

import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import Loading from '../../../shared/components/loading/Loading';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { UserType } from '../../login/types/UserType';
import EditUserDataButton from '../../../shared/components/editUserDataButton/EditUserDataButton';
import { PageContainer } from '../../../shared/components/pageContainer/PageContainer';
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';
import Breadcrumb from '../../../shared/components/breadcrumb/Breadcrumb';

const { Title } = Typography;

const PersonalData = () => {
  const { request, loading } = useRequests();
  const [user, setUser] = useState<UserType>();

  const fetchUser = async () => {
    const result = await request<UserType>(URL_USER, MethodsEnum.GET);
    if (result) {
      setUser(result);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);


  if (loading || !user) {
    return <PageContainer><Loading /></PageContainer>;
  }

  return (
    <>
      <HeaderCliente />
      <PageContainer>
        <Card>
          <Breadcrumb
          listBreadcrumb={[
            { name: 'Home', navigateTo: '/display' },
            { name: 'Meus Dados' },
          ]}
          />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0 }}>
          Meus Dados Pessoais
        </Title>
        <EditUserDataButton user={user} onUpdateSuccess={fetchUser} />
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome Completo">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Telefone">{insertMaskInPhone(user.phone || '')}</Descriptions.Item>
          <Descriptions.Item label="CPF">{insertMaskInCpf(user.cpf || '')}</Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
    </>
  );
};

export default PersonalData;