import { Card, Descriptions, Typography } from 'antd';
import { PageContainer } from '../../../shared/components/pageContainer/PageContainer';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import Loading from '../../../shared/components/loading/Loading';
import { useMyUser } from '../hooks/useMyUser';

const { Title } = Typography;

const PersonalData = () => {
  const { user, loading } = useMyUser();

  if (loading || !user) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Meus Dados Pessoais
      </Title>
      <Card>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome Completo">
            {user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone">
            {insertMaskInPhone(user.phone || '')}
          </Descriptions.Item>
          <Descriptions.Item label="CPF">
            {insertMaskInCpf(user.cpf || '')}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default PersonalData;