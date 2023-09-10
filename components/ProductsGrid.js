import styled from 'styled-components';
import ProductBox from './ProductBox';

const StyledProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 10px;
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox {...product} key={product._id} />
        ))}
    </StyledProductGrid>
  );
}
