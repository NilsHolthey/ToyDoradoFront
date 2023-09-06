import styled from 'styled-components';
import ProductBox from './ProductBox';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  padding-top: 10px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h2`
  font-size: 2.3rem;
  margin: 20px 0 20px 0;

  font-weight: normal;
  color: #333333;
`;
export default function NewProducts({ products }) {
  return (
    <Wrapper>
      <Title>Neuheiten</Title>
      <ProductGrid>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox {...product} key={product._id} />
          ))}
      </ProductGrid>
    </Wrapper>
  );
}
