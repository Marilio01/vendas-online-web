import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Dropdown, Typography, Drawer, List, Button } from 'antd'; // Adicionado Button
import {
  HeaderContainer,
  LeftSection,
  CenterSection,
  RightSection,
  LogoWrapper,
  LogoText,
  CartIcon,
  UserInfo,
  SearchInput,
} from './headerCliente.style';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  LockOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { logout } from '../../functions/connection/auth';
import { useCartReducer } from '../../../store/reducers/cartReducer/useCartReducer';
import { convertNumberToMoney } from '../../../shared/functions/money';
import { useCart } from '../../../modules/cart/hooks/useCart';

const HeaderCliente = () => {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');

  const { cart } = useCartReducer();
  useCart(); 

  const cartItems = Array.isArray(cart) ? cart : [];

  useEffect(() => {
    const nome = localStorage.getItem('nomeCliente');
    if (nome) {
      setNomeCliente(nome);
    }
  }, []);

  const formatarNome = (nomeCompleto: string) => {
    const partes = nomeCompleto.trim().split(' ');
    return partes.length >= 2 ? `${partes[0]} ${partes[1]}` : nomeCompleto;
  };

  const showLogoutModal = () => setOpenLogoutModal(true);
  const hideLogoutModal = () => setOpenLogoutModal(false);
  const handleLogout = () => {
    localStorage.removeItem('nomeCliente');
    logout(navigate);
  };
  
  const handleGoToCheckout = () => {
    setOpenCart(false);
    navigate('/checkout');
  };

  const menuItems = [
    { key: 'compras', icon: <ShoppingOutlined />, label: 'Ver Compras' },
    { key: 'senha', icon: <LockOutlined />, label: 'Alterar Senha' },
    { key: 'sair', icon: <LogoutOutlined />, label: 'Sair' },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === 'compras') navigate('/compras');
    else if (key === 'senha') navigate('/changePassword');
    else if (key === 'sair') showLogoutModal();
  };

  return (
    <>
      <Modal
        title="Atenção"
        open={openLogoutModal}
        onOk={handleLogout}
        onCancel={hideLogoutModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>

      <HeaderContainer>
        <LeftSection>
          <LogoWrapper />
          <LogoText>Sistema de Vendas</LogoText>
        </LeftSection>

        <CenterSection>
          <SearchInput
            placeholder="Buscar produtos..."
            prefix={<SearchOutlined />}
            allowClear
          />
        </CenterSection>

        <RightSection>
          <CartIcon onClick={() => setOpenCart(true)}>
            <ShoppingCartOutlined />
            {cart.length > 0 && (
              <span
                style={{
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: 12,
                  padding: '0 6px',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  transform: 'translate(50%, -50%)',
                }}
              >
                {cart.reduce((acc, item) => acc + item.amount, 0)}
              </span>
            )}
          </CartIcon>

          <Dropdown
            menu={{ items: menuItems, onClick: onMenuClick }}
            trigger={['click']}
            placement="bottomRight"
          >
            <UserInfo>
              <UserOutlined />
              <Typography.Text className="text-hover">
                {formatarNome(nomeCliente)}
              </Typography.Text>
              <DownOutlined />
            </UserInfo>
          </Dropdown>
        </RightSection>
      </HeaderContainer>

      <Drawer
        title="Carrinho de Compras"
        placement="right"
        onClose={() => setOpenCart(false)}
        open={openCart}
        width={350}
        footer={
          cartItems.length > 0 && (
            <Button 
              type="primary" 
              style={{ width: '100%' }}
              onClick={handleGoToCheckout}
            >
              Finalizar Compra
            </Button>
          )
        }
      >
        {cartItems.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <List
            dataSource={cartItems}
            renderItem={(item, index) => {
              const product = item.product ?? item;

              if (!product || !product.name || !product.price) {
                return (
                  <List.Item key={index}>
                    <div style={{ color: 'red' }}>Produto inválido</div>
                  </List.Item>
                );
              }

              return (
                <List.Item key={index}>
                  <List.Item.Meta
                    avatar={
                      <img
                        src={product.image || '/default-image.png'}
                        alt={product.name}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 4,
                        }}
                      />
                    }
                    title={`${product.name} x ${item.amount}`}
                    description={convertNumberToMoney(
                      (product.price || 0) * (item.amount ?? 1)
                    )}
                  />
                </List.Item>
              );
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export default HeaderCliente;