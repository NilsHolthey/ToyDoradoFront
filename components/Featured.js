/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';

import Button from './Button';
import ButtonLink from './ButtonLink';
import ListIcon from './icons/ListIcon';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
`;
const Bg = styled.div`
  background-color: #939597;
  color: rgb(241, 241, 241);
  padding-top: 10px;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`;

const Desc = styled.p`
  color: rgba(51, 51, 51, 0.9);
  font-size: 0.9rem;
`;
const Container = styled.div`
  display: grid;

  grid-template-rows: 1fr 1fr;
  gap: 40px;
  img {
    position: absolute;
    height: 220px;
    padding: 1px;
    filter: drop-shadow(8px 8px 12px rgba(51, 51, 51, 0.9))
      drop-shadow(-4px -4px 10px rgba(221, 221, 221, 0.7));
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
  }
`;

const Collum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 30px;
`;

const ImageWrapper = styled.div`
  background-color: rgba(241, 241, 241, 0.8);
  border-radius: 50%;
  position: relative;
  height: 180px;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;

  filter: drop-shadow(8px 8px 12px rgba(51, 51, 51, 0.9))
    drop-shadow(-4px -4px 10px rgba(221, 221, 221, 0.7));
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Wrapper>
        <Container>
          <Collum>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}.</Desc>
              <ButtonContainer>
                <ButtonLink
                  href={'/product/' + product._id}
                  light={1}
                  outline={1}
                >
                  ...mehr
                </ButtonLink>
                <Button type="button" prmy="1" onClick={addFeaturedToCart}>
                  <ListIcon />
                  Auf den Wunschzettel
                </Button>
              </ButtonContainer>
            </div>
          </Collum>
          <Collum>
            <ImageWrapper>
              <img src="FF-Pauli.png" alt="pauli " />
            </ImageWrapper>
          </Collum>
        </Container>
      </Wrapper>
    </Bg>
  );
}
