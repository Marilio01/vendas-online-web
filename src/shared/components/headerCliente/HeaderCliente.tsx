import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Dropdown, Typography, Drawer, List, Button } from 'antd';
import {
  HeaderContainer, LeftSection, CenterSection, RightSection, LogoWrapper, LogoText,
  CartIcon, UserInfo, SearchInput, AdminButton, EmptyCartContainer, EmptyCartIcon,
} from './headerCliente.style';
import {
  SearchOutlined, ShoppingCartOutlined, UserOutlined, ShoppingOutlined, LogoutOutlined,
  LockOutlined, DownOutlined, IdcardOutlined, ToolOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { getUserInfoByToken, logout } from '../../functions/connection/auth';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { useCart } from '../../../modules/cart/hooks/useCart';
import { UserTypeEnum } from '../../enums/userType.enum';
import { convertNumberToMoney } from '../../../shared/functions/money';

const { Title, Text } = Typography;

const HeaderCliente = () => {
  const navigate = useNavigate();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');

  const user = useMemo(() => getUserInfoByToken(), []);
  const { cart, removeProductFromCart } = useCart();
  const { setSearchTerm } = useProductReducer();

  const [deleteModal, setDeleteModal] = useState<{ visible: boolean; id?: number }>({ visible: false });

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await removeProductFromCart(deleteModal.id);
      setDeleteModal({ visible: false });
    }
  };

  const cartItems = Array.isArray(cart) ? cart : [];

  const cartTotalValue = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.product.price * item.amount), 0);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.amount, 0);
  }, [cartItems]);

  const handleGoToAdmin = () => navigate('/product');
  const handleGoToHome = () => navigate('/display');

  useEffect(() => {
    const nome = localStorage.getItem('nomeCliente');
    if (nome) setNomeCliente(nome);
  }, []);

  const formatarNome = (nomeCompleto: string) => {
    const partes = nomeCompleto.trim().split(' ');
    return partes.length >= 2 ? `${partes[0]} ${partes[1]}` : nomeCompleto;
  };

  const showLogoutModal = () => setOpenLogoutModal(true);
  const hideLogoutModal = () => setOpenLogoutModal(false);
  const handleLogout = async () => { await logout(navigate); };
  const handleGoToCheckout = () => { setOpenCart(false); navigate('/checkout'); };
  
  const menuItems = [
    { key: 'compras', icon: <ShoppingOutlined />, label: 'Minhas Compras' },
    { key: 'dados', icon: <IdcardOutlined />, label: 'Meus Dados' },
    { key: 'senha', icon: <LockOutlined />, label: 'Alterar Senha' },
    { key: 'sair', icon: <LogoutOutlined />, label: 'Sair' },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    if (key === 'compras') navigate('/compras');
    else if (key === 'dados') navigate('/meus-dados');
    else if (key === 'senha') navigate('/changePassword');
    else if (key === 'sair') showLogoutModal();
  };

  return (
    <>  
      <Modal
        open={deleteModal.visible}
        title="Tem certeza?"
        onCancel={() => setDeleteModal({ visible: false })}
        onOk={confirmDelete}
        okText="Sim, remover"
        cancelText="Cancelar"
      >
        Deseja remover este item do carrinho?
    </Modal>
      <Modal title="Atenção" open={openLogoutModal} onOk={handleLogout} onCancel={hideLogoutModal} okText="Sim" cancelText="Cancelar">
        <p>Tem certeza que deseja sair?</p>
      </Modal>

      <HeaderContainer>
        <LeftSection onClick={handleGoToHome}>
          <LogoWrapper />
          <LogoText>Vendas Online</LogoText>
        </LeftSection>
        <CenterSection>
          <SearchInput 
            placeholder="Buscar produtos..." 
            prefix={<SearchOutlined />} 
            onSearch={(value) => setSearchTerm(value)}
            allowClear 
            enterButton
          />
        </CenterSection>
        <RightSection>
          {(user?.typeUser === UserTypeEnum.Root || user?.typeUser === UserTypeEnum.Admin) && (
            <AdminButton icon={<ToolOutlined />} onClick={handleGoToAdmin}>
              Painel Admin
            </AdminButton>
          )}
          <CartIcon onClick={() => setOpenCart(true)}>
            <ShoppingCartOutlined />
            {cartItems.length > 0 && (
              <span style={{
                  backgroundColor: '#ff4d4f', borderRadius: '50%', color: 'white',
                  fontSize: 11, fontWeight: 'bold', padding: '2px 5px', position: 'absolute',
                  top: 0, right: 0, transform: 'translate(40%, -40%)', lineHeight: 1,
                  border: '1px solid #001529'
              }}>
                {cartItemCount}
              </span>
            )}
          </CartIcon>
          <Dropdown menu={{ items: menuItems, onClick: onMenuClick }} trigger={['click']} placement="bottomRight">
            <UserInfo>
              <UserOutlined />
              <Text className="text-hover">{formatarNome(nomeCliente)}</Text>
              <DownOutlined style={{ fontSize: 12, marginLeft: 4 }}/>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Total de produtos:</Text>
                <Text strong>{cartItemCount} {cartItemCount > 1 ? 'itens' : 'item'}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Title level={5} style={{ margin: 0 }}>Total:</Title>
                <Title level={5} style={{ margin: 0 }}>{convertNumberToMoney(cartTotalValue)}</Title>
              </div>
              <Button type="primary" style={{ width: '100%' }} onClick={handleGoToCheckout}>
                Finalizar Compra
              </Button>
            </div>
          )
        }
      >
        {cartItems.length === 0 ? (
          <EmptyCartContainer>
            <EmptyCartIcon />
            <Title level={5}>Seu carrinho está vazio</Title>
            <Text type="secondary">Adicione produtos para vê-los aqui.</Text>
          </EmptyCartContainer>
        ) : (
          <List
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => setDeleteModal({ visible: true, id: item.product.id })}
              />
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={item.product?.image || '/default-image.png'} alt={item.product?.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }} />}
                  title={`${item.product?.name} x ${item.amount}`}
                  description={convertNumberToMoney((item.product?.price || 0) * (item.amount || 1))}
                />
              </List.Item>
            )}
          />
        )}
      </Drawer>
    </>
  );
};

export default HeaderCliente;