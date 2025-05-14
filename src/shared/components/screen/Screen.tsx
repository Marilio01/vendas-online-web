import { Divider } from 'antd';
import Breadcrumb, { ListBreadcrumb } from '../breadcrumb/Breadcrumb';
import { ScreenContainer } from './screen.style';
import Header from '../header/Header';
import Menu from '../menu/Menu';

interface ScreenProps {
  children: React.ReactNode;
  listBreadcrumb?: ListBreadcrumb[];
}

const Screen = ({ children, listBreadcrumb }: ScreenProps) => {
  return (
    <>
      <Header />
      <ScreenContainer>
        <Menu />
        {listBreadcrumb && (
          <>
            <Breadcrumb listBreadcrumb={listBreadcrumb} />
            <Divider />
          </>
        )}

        {children}
      </ScreenContainer>
    </>
  );
};

export default Screen;
