import styled from 'styled-components';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 20px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
`;
export default function NewProducts({ products }) {
  return (
    <Wrapper>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox {...product} key={product._id} />
          ))}
      </ProductGrid>
    </Wrapper>
  );
}
