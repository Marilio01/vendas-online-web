import { Table, Typography, Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useMemo } from 'react';
import { OrderType } from '../../../shared/types/OrderType';
import { useOrderClient } from '../hooks/useOrderClient';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { OrderClientRoutesEnum } from '../routes';
import { PageContainer } from '../../../shared/components/pageContainer/PageContainer';
import Breadcrumb from '../../../shared/components/breadcrumb/Breadcrumb';
import HeaderCliente from '../../../shared/components/headerCliente/HeaderCliente';

const { Title } = Typography;

const columns: ColumnsType<OrderType> = [
  {
    title: 'Pedido Nº',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>#{text}</a>,
  },
  {
    title: 'Data da Compra',
    dataIndex: 'date',
    key: 'date',
    render: (text) => <a>{text ? format(new Date(text), "EEEE, dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}</a>,
  },
  {
    title: 'Valor Total',
    dataIndex: 'payment',
    key: 'payment',
    render: (payment) => <a>{convertNumberToMoney(payment?.finalPrice ?? 0)}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'payment',
    key: 'status',
    render: (payment) => <a>{payment?.paymentStatus?.name ?? 'N/A'}</a>,
  },
];

const OrderClientListScreen = () => {
  const { orders, loading } = useOrderClient();
  const navigate = useNavigate();

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => a.id - b.id);
  }, [orders]);

  return (
    <>
    <HeaderCliente />
    <PageContainer>
      <Card>
      <Breadcrumb
        listBreadcrumb={[
          { name: 'Home', navigateTo: '/display' },
          { name: 'Minhas Compras' },
        ]}
      />
        <Title level={4} style={{ marginBottom: '24px' }}>
          Minhas Compras
        </Title>
        <Table
          loading={loading}
          onRow={(record) => ({
            onClick: () => navigate(`${OrderClientRoutesEnum.ORDER_CLIENT}/${record.id}`),
          })}
          columns={columns}
          dataSource={sortedOrders}
          rowKey="id"
        />
      </Card>
    </PageContainer>
    </>
  );
};

export default OrderClientListScreen;