import Header from '@/components/Header';
import styled from 'styled-components';
import { primary } from '@/lib/colors';
import { Josefin_Sans } from 'next/font/google';
import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import ProductsGrid from '@/components/ProductsGrid';
import { Title } from '@/components/Title';

const josefinSans = Josefin_Sans({ subsets: ['latin'] });

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function Products({ products }) {
  return (
    <>
      <Header />
      <Wrapper>
        <Title className={josefinSans.className}>Alle Produkte</Title>
        <ProductsGrid products={products} />
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
