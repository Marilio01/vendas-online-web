import { Descriptions, Divider, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import Screen from '../../../shared/components/screen/Screen';
import Loading from '../../../shared/components/loading/Loading';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styled';
import { useOrderDetail } from '../hooks/useOrderDetail';
import ListOrderProduct from '../componets/ListOrderProduct';
import { OrderRoutesEnum } from '../routes';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { insertMaskInCEP } from '../../../shared/functions/address';
import { insertMaskInCpf } from '../../../shared/functions/cpf';
import { insertMaskInPhone } from '../../../shared/functions/phone';

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

const OrderDetailScreen = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderDetail(orderId);

  const isCardPayment = order?.payment?.type === 'PaymentCreditCardEntity';

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'PEDIDOS', navigateTo: OrderRoutesEnum.ORDER },
        { name: `Detalhes do Pedido #${orderId}` },
      ]}
    >
      {!order || loading ? (
        <DisplayFlexJustifyCenter>
          <Loading size="large" />
        </DisplayFlexJustifyCenter>
      ) : (
        <>
          <Descriptions title="Dados do usuário" bordered>
            <Descriptions.Item label="Nome">{order.user?.name ?? 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email" span={2}>
              {order.user?.email ?? 'N/A'}
            </Descriptions.Item>
            <Descriptions.Item label="Telefone">
              {insertMaskInPhone(order.user?.phone || '')}
            </Descriptions.Item>
            <Descriptions.Item label="CPF" span={2}>
              {insertMaskInCpf(order.user?.cpf || '')}
            </Descriptions.Item>
          </Descriptions>

          <Divider />

          <Descriptions title="Dados do pagamento" bordered>
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

          <Descriptions title="Dados do endereço" bordered>
            <Descriptions.Item label="Cidade">{order.address?.city?.name ?? 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Estado">{order.address?.city?.state?.name ?? 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Complemento">{order.address?.complement ?? 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Número">{order.address?.numberAddress ?? 'S/N'}</Descriptions.Item>
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
      )}
    </Screen>
  );
};

export default OrderDetailScreen;