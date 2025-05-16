import { Descriptions, Divider } from 'antd';
import Screen from '../../../shared/components/screen/Screen';
import { OrderRoutesEnum } from '../routes';
import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../hooks/useOrderDetail';

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order } = useOrderDetail(orderId);

  console.log('order', order);

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PEDIDOS',
          navigateTo: OrderRoutesEnum.ORDER,
        },
        {
          name: 'Detalhes',
        },
      ]}
    >
      <Descriptions title="Dados do usuário" bordered>
        <Descriptions.Item label="Nome">Marilionovo</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Dados do pagamento" bordered>
        <Descriptions.Item label="Nome">Marilionovo</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Dados do endereço" bordered>
        <Descriptions.Item label="Nome">Marilionovo</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title="Produtos" bordered>
        <Descriptions.Item label="Nome">Marilionovo</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          Prepaid
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">YES</Descriptions.Item>
        <Descriptions.Item label="CPF" span={2}>
          2018-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
      </Descriptions>
    </Screen>
  );
};

export default OrderDetail;
