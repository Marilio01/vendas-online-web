import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

type CartQuantityManagerProps = {
  amount: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const CartQuantityManager = ({ amount, onIncrease, onDecrease }: CartQuantityManagerProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
      <Button onClick={onDecrease} icon={<MinusOutlined />} />
      <span style={{ margin: '0 8px', minWidth: '20px', textAlign: 'center' }}>{amount}</span>
      <Button onClick={onIncrease} icon={<PlusOutlined />} />
    </div>
  );
};

export default CartQuantityManager;