import { Typography, Divider } from 'antd';
import { useClientProduct } from '../hooks/useClientProduct';
import { Container, StyledRow, CategoryTitle } from '../styles/clienteProduct.style';
import ProductCard from './ProductCard';

const { Title } = Typography;

const ClientProduct = () => {
  const { groupedProducts } = useClientProduct();

  return (
    <Container>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Nossos Produtos
      </Title>
      
      {groupedProducts.map((group, index) => (
        <div key={group.category.id}>
          
          {index > 0 && <Divider />}

          <CategoryTitle>{group.category.name}</CategoryTitle>
          <StyledRow>
            {group.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StyledRow>
        </div>
      ))}
    </Container>
  );
};

export default ClientProduct;