import { useClientProduct } from '../hooks/useClientProduct';
import { Container, StyledRow } from '../styles/clienteProduct.style';
import ProductCard from './ProductCard';

const ClientProduct = () => {
  const { productsFiltered } = useClientProduct();

  return (
    <Container>
      <StyledRow>
        {productsFiltered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </StyledRow>
    </Container>
  );
};

export default ClientProduct;