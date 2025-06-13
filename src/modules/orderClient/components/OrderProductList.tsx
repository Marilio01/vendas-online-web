import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { OrderProductType } from '../../../shared/types/OrderProductType';
import { convertNumberToMoney } from '../../../shared/functions/money';

const columns: ColumnsType<OrderProductType> = [
  { title: 'Nome Produto', dataIndex: 'name', render: (_, target) => target.product?.name },
  { title: 'Quantidade', dataIndex: 'amount' },
  { title: 'Preço Unitário', dataIndex: 'price', render: (text) => convertNumberToMoney(text) },
  { title: 'Total', key: 'total', render: (_, target) => convertNumberToMoney(target.price * target.amount) },
];

interface OrderProductListProps {
  ordersProduct?: OrderProductType[];
}

const OrderProductList = ({ ordersProduct }: OrderProductListProps) => {
  if (!ordersProduct || ordersProduct.length === 0) {
    return null;
  }
  return <Table columns={columns} dataSource={ordersProduct} rowKey="id" pagination={false} />;
};

export default OrderProductList;