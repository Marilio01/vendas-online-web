import {
  HomeOutlined,
  LaptopOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  CrownOutlined,
  MenuOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as MenuAntd } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryRoutesEnum } from '../../../modules/category/routes';
import { ProductRoutesEnum } from '../../../modules/product/routes';
import { OrderRoutesEnum } from '../../../modules/orders/routes';
import { UserRoutesEnum } from '../../../modules/user/routes';
import { AdminRoutesEnum } from '../../../modules/admin/routes';
import { UsuarioDisplayRoutesEnum } from '../../../modules/usuarioDisplay/routes';
import { getUserInfoByToken } from '../../functions/connection/auth';
import { UserTypeEnum } from '../../../shared/enums/userType.enum';
import {
  ContainerLogoName,
  ContainerMenu,
  LogoMenu,
  NameCompany,
  ToggleMenuButton,
  Overlay,
} from './menu.style';
import SVGLogo from '../icons/SVGLogo';

type MenuItem = Required<MenuProps>['items'][number];

const Menu = () => {
  const userToken = useMemo(() => getUserInfoByToken(), []);
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  const handleNavigation = (route: string) => {
    navigate(route);
    if (window.innerWidth <= 768) {
      setIsMobileMenuVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
      onClick: () => handleNavigation(UsuarioDisplayRoutesEnum.USUARIO_DISPLAY),
    },
    {
      key: 'products',
      label: 'Produtos',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'products_view',
          label: 'Visualizar',
          onClick: () => handleNavigation(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'products_insert',
          label: 'Inserir',
          onClick: () => handleNavigation(ProductRoutesEnum.PRODUCT_INSERT),
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
          onClick: () => handleNavigation(CategoryRoutesEnum.CATEGORY),
        },
        {
          key: 'category_insert',
          label: 'Inserir',
          onClick: () => handleNavigation(CategoryRoutesEnum.CATEGORY_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <SafetyCertificateOutlined />,
      onClick: () => handleNavigation(OrderRoutesEnum.ORDER),
    },
    {
      key: 'user',
      label: 'Clientes',
      icon: <TeamOutlined />,
      onClick: () => handleNavigation(UserRoutesEnum.USER),
    },
    ...(userToken?.typeUser === UserTypeEnum.Root
      ? [
          {
            key: 'admin',
            label: 'Admins',
            icon: <CrownOutlined />,
            onClick: () => handleNavigation(AdminRoutesEnum.ADMIN),
          },
        ]
      : []),
  ];

  const onMenuClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <ToggleMenuButton
        icon={isMobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
        onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
      />
      <Overlay
        $isMobileMenuVisible={isMobileMenuVisible}
        onClick={() => setIsMobileMenuVisible(false)}
      />
      <ContainerMenu $isMobileMenuVisible={isMobileMenuVisible}>
        <ContainerLogoName>
          <LogoMenu>
            <SVGLogo />
          </LogoMenu>
          <NameCompany $isMobileMenuVisible={isMobileMenuVisible}>Vendas Online</NameCompany>
        </ContainerLogoName>
        <MenuAntd
          theme="dark"
          onClick={onMenuClick}
          style={{ width: '100%', borderRight: 0 }}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </ContainerMenu>
    </>
  );
};

export default Menu;