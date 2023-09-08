import Button from '@/components/Button';
import Header from '@/components/Header';
import ListIcon from '@/components/icons/ListIcon';
import { primary } from '@/lib/colors';

import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { Josefin_Sans } from 'next/font/google';
import styled from 'styled-components';

const josefinSans = Josefin_Sans({ subsets: ['latin'] });

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 1.8rem;
  margin: 0 0 20px 0;
  padding: 0 15px;
  text-align: center;
  text-decoration: underline ${primary} solid 5px;
  text-underline-offset: 0.6rem;
  line-height: 3rem;
  font-weight: normal;
  color: #333333;
  display: inline-block;
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  padding: 10px 10px 5px 10px;
  background-color: whitesmoke;
  gap: 20px;
  border: 2px solid #f7f4e1;
  border-radius: 12px;
`;

const PlaceholderImage = styled.img`
  cursor: pointer;
  max-height: 500px;
  padding-top: 10px;
  width: 80%;
  padding-bottom: 10px;
  transition: scale 350ms ease-in-out;
`;

const ProductImage = styled.img`
  cursor: pointer;
  max-height: 500px;
  padding-top: 10px;
  width: 80%;
  padding-bottom: 10px;
  transition: scale 350ms ease-in-out;

  filter: drop-shadow(-8px 4px 6px rgba(51, 51, 51, 0.5));
`;

const Box = styled.div`
  background-color: rgba(221, 221, 221, 1);

  padding: 10px;
  margin: 15px;
  min-height: 300px;
  height: 520px;
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

  /* img {
    cursor: pointer;
    max-height: 500px;
    padding-top: 10px;
    width: 80%;
    padding-bottom: 10px;
    transition: scale 350ms ease-in-out;

    filter: drop-shadow(-8px 4px 6px rgba(51, 51, 51, 0.5));
  } */
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0 10px;
  margin: 15px;
  /* background-color: rgb(241, 241, 241); */
  border-radius: 8px;
  color: #333333;
`;

const Desc = styled.p`
  margin: 10px 0;
`;

const Price = styled.div`
  font-weight: bolder;
  color: #008c9b;
  font-size: 2.5rem;
`;

const PiceRow = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
  margin: 10px;
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const Condition = styled.div`
  display: flex;
  font-size: 0.8rem;
  gap: 5px;
  color: #606162;
  p:nth-child(1) {
    font-weight: bolder;
  }
`;
const PropeertiesRow = styled.div`
  font-size: 0.8rem;
  color: #606162;
  display: flex;

  gap: 5px;
  p:nth-child(1) {
    font-weight: bolder;
  }
`;

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Wrapper>
        {/* <Title className={josefinSans.className}>{product.title} </Title> */}
        <ColWrapper>
          <Box>
            {product.images.length > 0 ? (
              <ProductImage
                src={product.images[0]}
                alt="{product.description}"
              />
            ) : (
              <PlaceholderImage src="/placeholder.png" alt="Placeholder" />
            )}
          </Box>
          <InfoBox>
            <TopRow>
              <Title className={josefinSans.className}>{product.title} </Title>
              <Desc>{product.description}</Desc>
              <Condition>
                <p>Zustand:</p>
                <p>{product.condition}</p>
              </Condition>
              {product.properties.length > 0 &&
                product.properties.map((property) => (
                  <PropeertiesRow key={product._id}>
                    <p>{property.name}:</p>
                    <p>{property.values}</p>
                  </PropeertiesRow>
                ))}
            </TopRow>

            <PiceRow>
              <Price> {product.price}€</Price>
              <Button prmy="1" size="lg">
                <ListIcon />
                Auf den Wunschzettel
              </Button>
            </PiceRow>
          </InfoBox>
        </ColWrapper>
      </Wrapper>
    </>
  );
}
export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
