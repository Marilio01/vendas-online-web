import { Descriptions, Divider, Typography, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { useOrderClientDetail } from '../hooks/useOrderClientDetail';
import { PageContainer } from '../../../shared/components/pageContainer/PageContainer';
import Loading from '../../../shared/components/loading/Loading';
import { insertMaskInPhone } from '../../../shared/functions/phone';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { insertMaskInCEP } from '../../../shared/functions/address';
import ListOrderProduct from '../../orders/componets/ListOrderProduct';
import Breadcrumb from '../../../shared/components/breadcrumb/Breadcrumb';
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';

const { Title } = Typography;

const formatPaymentType = (type?: string) => {
  if (!type) return 'Não informado';
  switch (type) {
    case 'PaymentPixEntity':
      return 'PIX';
    case 'PaymentCreditCardEntity':
      return 'Cartão de Crédito';
    default:
      return type;
  }
};

const OrderClientDetailScreen = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderClientDetail(orderId);

  if (loading || !order) {
    return (
      <PageContainer>
        <Loading size="large" />
      </PageContainer>
    );
  }

  const isCardPayment = order.payment?.type === 'PaymentCreditCardEntity';

  return (
    <>
    <HeaderCliente />
    <PageContainer>
      <Card>
        <Breadcrumb
        listBreadcrumb={[
          { name: 'Home', navigateTo: '/display' },
          { name: 'Minhas Compras', navigateTo: '/compras' },
          { name: 'Detalhes do Pedido'},
        ]}
      />
      <Title level={3} style={{ marginBottom: '24px' }}>
        Detalhes do Pedido #{orderId}
      </Title>

      <>
        <Descriptions title="Meus Dados" bordered>
          <Descriptions.Item label="Nome">{order.user?.name ?? 'Não informado'}</Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {order.user?.email ?? 'Não informado'}
          </Descriptions.Item>
          <Descriptions.Item label="Telefone">
            {insertMaskInPhone(order.user?.phone || '')}
          </Descriptions.Item>
          <Descriptions.Item label="CPF" span={2}>
            {insertMaskInCpf(order.user?.cpf || '')}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Descriptions title="Dados do Pagamento" bordered>
          <Descriptions.Item label="Preço dos Produtos">
            {convertNumberToMoney(order.payment?.price ?? 0)}
          </Descriptions.Item>
          <Descriptions.Item label="Desconto" span={2}>
            {convertNumberToMoney(order.payment?.discount ?? 0)}
          </Descriptions.Item>
          <Descriptions.Item label="Preço Final" span={3}>
            {convertNumberToMoney(order.payment?.finalPrice ?? 0)}
          </Descriptions.Item>
          
          <Descriptions.Item label="Tipo de pagamento" span={isCardPayment ? 1 : 2}>
            {formatPaymentType(order.payment?.type)}
          </Descriptions.Item>

          {isCardPayment && (
            <Descriptions.Item label="Parcelas">
              {order.payment?.amountPayments ?? 1}x
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Status">
            {order.payment?.paymentStatus?.name ?? 'Status não disponível'}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

      <Descriptions title="Dados do Endereço" bordered>
      <Descriptions.Item label="Endereço" span={3}>
        {`${order.address?.street || ''}, ${order.address?.numberAddress || 'S/N'}`}
      </Descriptions.Item>

      <Descriptions.Item label="Bairro">
        {order.address?.neighborhood || 'Não informado'}
      </Descriptions.Item>
      <Descriptions.Item label="Complemento" span={2}>
        {order.address?.complement || 'Nenhum'}
      </Descriptions.Item>

      <Descriptions.Item label="Cidade / UF">
        {`${order.address?.city?.name || ''} / ${order.address?.city?.state?.uf || ''}`}
      </Descriptions.Item>
      <Descriptions.Item label="CEP" span={2}>
        {insertMaskInCEP(order.address?.cep || '')}
      </Descriptions.Item>
      </Descriptions>

        <Divider />
        
        <Title level={4} style={{ marginTop: '24px', marginBottom: '16px' }}>
            Produtos no Pedido
        </Title>
        <ListOrderProduct ordersProduct={order.ordersProduct} />
      </>
      </Card>
    </PageContainer>
    </>
  );
};

export default OrderClientDetailScreen;