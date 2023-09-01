import styled from 'styled-components';
import Button from './Button';
import ListIcon from './icons/ListIcon';

const Box = styled.div`
  background-color: rgba(221, 221, 221, 1);

  padding: 20px;
  min-height: 100px;
  height: 220px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 180px;
    padding-top: 20px;
    max-width: 100%;
    padding-bottom: 10px;
    filter: drop-shadow(-6px 4px 8px rgba(51, 51, 51, 0.5));
  }
`;
const ProductWrapper = styled.div`
  margin-top: 20px;
`;
const ProductInfoBox = styled.div`
  margin-top: 10px;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;

const PiceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  return (
    <ProductWrapper>
      <Box>
        <div>
          <img src={images[0]} alt="{description}" />
        </div>
      </Box>
      <ProductInfoBox>
        <Title>{title}</Title>

        <PiceRow>
          <div>{price}€</div>{' '}
          <Button prmy="1">
            <ListIcon />
          </Button>
        </PiceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
