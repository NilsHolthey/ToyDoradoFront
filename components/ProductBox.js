import styled from 'styled-components';
import Button from './Button';
import ListIcon from './icons/ListIcon';
import Link from 'next/link';

const PlaceholderImage = styled.img`
  cursor: pointer;
  max-height: 180px;
  padding-top: 20px;
  max-width: 100%;
  padding-bottom: 10px;
  transition: scale 350ms ease-in-out;
`;

const ProductImage = styled.img`
  cursor: pointer;
  max-height: 180px;
  padding-top: 20px;
  max-width: 100%;
  padding-bottom: 10px;
  transition: scale 350ms ease-in-out;

  filter: drop-shadow(-8px 4px 6px rgba(51, 51, 51, 0.5));
`;

const Box = styled(Link)`
  background-color: rgba(221, 221, 221, 1);
  padding: 20px;
  min-height: 100px;
  height: 220px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #f7f4e1;
    transition: background-color 400ms ease-in-out;
  }
  &:hover ${ProductImage} {
    scale: 1.2;
    transition: scale 350ms ease-in-out;
  }
`;
const ProductWrapper = styled.div`
  margin-top: 20px;
  background-color: whitesmoke;
  padding: 5px;
  border: 2px solid #f7f4e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProductInfoBox = styled.div`
  margin-top: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.8rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const PiceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 5px;
`;

const Price = styled.div`
  font-weight: bolder;
  color: #008c9b;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const url = '/product/' + _id;

  return (
    <ProductWrapper>
      <Box href={url}>
        <div>
          {images.length > 0 ? (
            <ProductImage src={images[0]} alt="{description}" />
          ) : (
            <PlaceholderImage src="/placeholder.png" alt="Placeholder" />
          )}
        </div>
      </Box>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>

        <PiceRow>
          <Price>{price} €</Price>
          <Button prmy="1">
            <ListIcon />
          </Button>
        </PiceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
