import Header from '@/components/Header';
import styled from 'styled-components';
import { primary } from '@/lib/colors';
import { Josefin_Sans } from 'next/font/google';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import ProductsGrid from '@/components/ProductsGrid';
import { Title } from '@/components/Title';
import { useEffect, useState } from 'react';

const josefinSans = Josefin_Sans({ subsets: ['latin'] });

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const GridNavigation = styled.div`
  border-radius: 8px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  background-color: rgba(221, 221, 221, 1);
  p {
    padding: 0 5px 0 5px;
  }
  button {
    background-color: whitesmoke;
    border: none;
    height: 25px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
  }
  svg {
    height: 20px;
    width: 20px;
  }
  span {
    background-color: whitesmoke;
    border: none;
    height: 25px;
    padding: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 25px;
  }
`;

export default function Products({ products }) {
  const [slicedProducts, setSlicedProducts] = useState(products.slice(0, 16));
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(16);

  useEffect(() => {
    setSlicedProducts(products.slice(startValue, endValue));
  }, [endValue, startValue, products]);

  function increaseProducts() {
    setStartValue(startValue + 16);
    setEndValue(endValue + 16);
  }
  function decreaseProducts() {
    setStartValue(startValue - 16);
    setEndValue(endValue - 16);
  }

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <Wrapper>
        <Title className={josefinSans.className}>Alle Produkte</Title>
        <ProductsGrid products={slicedProducts} />
        <GridNavigation>
          {startValue > 0 ? (
            <button onClick={decreaseProducts}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
          ) : (
            <span></span>
          )}
          {endValue < products.length ? (
            <p>
              ({startValue + 1}-{endValue})
            </p>
          ) : (
            <p>
              ({startValue + 1}-{products.length + 1})
            </p>
          )}
          {endValue < products.length ? (
            <button onClick={increaseProducts}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          ) : (
            <span></span>
          )}
        </GridNavigation>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { category: -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
