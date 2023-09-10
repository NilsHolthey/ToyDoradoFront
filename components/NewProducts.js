import styled from 'styled-components';

import { Josefin_Sans } from 'next/font/google';
import { primary } from '@/lib/colors';
import ProductsGrid from './ProductsGrid';

// If loading a variable font, you don't need to specify the font weight

const josefinSans = Josefin_Sans({ subsets: ['latin'] });

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
  padding: 0 10px;
  border-bottom: 4px solid ${primary};
  font-weight: normal;
  color: #333333;
`;
export default function NewProducts({ products }) {
  return (
    <Wrapper>
      <Title className={josefinSans.className}>Neuheiten</Title>
      <ProductsGrid products={products} />
    </Wrapper>
  );
}
