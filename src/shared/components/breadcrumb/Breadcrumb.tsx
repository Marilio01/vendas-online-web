import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';

export interface ListBreadcrumb {
  name: string;
  navigateTo?: string;
}

interface BreadcrumbProps {
  listBreadcrumb: ListBreadcrumb[];
}

const Breadcrumb = ({ listBreadcrumb }: BreadcrumbProps) => {

  return (
    <AntdBreadcrumb style={{ marginBottom: '16px' }}>
      <AntdBreadcrumb.Item>
      </AntdBreadcrumb.Item>
      
      {listBreadcrumb.map((breadcrumb, index) => (
        <AntdBreadcrumb.Item key={`breadcrumb_${index}`}>
          {breadcrumb.navigateTo ? (
            <Link to={breadcrumb.navigateTo}>{breadcrumb.name.toUpperCase()}</Link>
          ) : (
            <span>{breadcrumb.name.toUpperCase()}</span>
          )}
        </AntdBreadcrumb.Item>
      ))}
    </AntdBreadcrumb>
  );
};

export default Breadcrumb;