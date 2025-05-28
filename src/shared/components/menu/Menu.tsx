import {
  HomeOutlined,
  LaptopOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CrownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryRoutesEnum } from '../../../modules/category/routes';
import { ProductRoutesEnum } from '../../../modules/product/routes';
import { ContainerLogoName, ContainerMenu, LogoMenu, NameCompany } from './menu.style';
import { OrderRoutesEnum } from '../../../modules/orders/routes';
import { UserRoutesEnum } from '../../../modules/user/routes';
import { getUserInfoByToken } from '../../functions/connection/auth';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const userToken = useMemo(() => getUserInfoByToken(), []);
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'category',
      label: 'Categorias',
      icon: <ProfileOutlined />,
      children: [
        {
          key: 'category_view',
          label: 'Visualizar',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY),
        },
        {
          key: 'category_insert',
          label: 'Inserir',
          onClick: () => navigate(CategoryRoutesEnum.CATEGORY_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <SafetyCertificateOutlined />,
      onClick: () => navigate(OrderRoutesEnum.ORDER),
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <TeamOutlined />,
      onClick: () => navigate(UserRoutesEnum.USER),
    },
    ...(userToken?.typeUser === UserTypeEnum.Root
      ? [
          {
            key: 'admin',
            label: 'Admins',
            icon: <CrownOutlined />,
            onClick: () => navigate(UserRoutesEnum.ADMIN),
          },
        ]
      : []),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <ContainerMenu>
      <ContainerLogoName>
        <LogoMenu />
        <NameCompany>Vendas Online</NameCompany>
      </ContainerLogoName>
      <MenuAntd
        theme="dark"
        onClick={onClick}
        style={{ width: 240 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </ContainerMenu>
  );
};

export default Menu;
