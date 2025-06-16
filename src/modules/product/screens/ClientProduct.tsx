import { Typography } from 'antd';
import { useClientProduct } from '../hooks/useClientProduct';
import { 
  Container, 
  ProductGrid,
  CategoryTitle, 
  CategorySection,
} from '../styles/clienteProduct.style';
import ProductCard from './ProductCard';

const { Title, Paragraph } = Typography;

const ClientProductScreen = () => {
  const { groupedProducts } = useClientProduct();

  return (
    <Container>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1} style={{ marginBottom: 8, fontWeight: 700 }}>
          Nossos Produtos
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Explore nossa seleção de produtos de alta qualidade, cuidadosamente separados por categoria para você.
        </Paragraph>
      </div>
      
      {groupedProducts.map((group) => (
        <CategorySection key={group.category.id}>
          <CategoryTitle>{group.category.name}</CategoryTitle>
          <ProductGrid>
            {group.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </CategorySection>
      ))}
    </Container>
  );
};

export default ClientProductScreen;