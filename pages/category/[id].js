import Header from '@/components/Header';
import Layout from '@/components/Layout';
import ProductsGrid from '@/components/ProductsGrid';
import { Title } from '@/components/Title';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Categories';
import { Product } from '@/models/Product';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styled from 'styled-components';

const StyledDiv = styled.div`
  position: sticky;
  flex-wrap: wrap;
  top: 77px;
  width: 100%;
  padding: 20px 5px 10px 5px;
  display: flex;
  justify-content: center;

  gap: 30px;
  margin: 0 auto;

  backdrop-filter: blur(5px);
  z-index: 5;
  //background-color: rgba(147, 149, 151, 1);
  background-color: rgba(241, 241, 241, 0.7);

  @media screen and (min-width: 768px) {
    gap: 25px;
    padding: 20px 0 10px 0;
  }
`;

const NavLink = styled(Link)`
  color: rgb(51, 51, 51);
  font-size: 0.75rem;
  text-underline-offset: 0.4rem;
  text-decoration: underline rgba(51, 51, 51, 0.5) solid 1px;
  text-transform: uppercase;

  font-weight: ${(props) => (props.href === props.pathname ? 'bolder' : '')};

  @media screen and (min-width: 768px) {
    padding: 50px 0;
    font-size: 1rem;
  }
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 5px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (min-width: 768px) {
    padding: 50px 0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default function CategoryPage({ category, products, mainCategories }) {
  const pathname = usePathname();
  return (
    <Layout>
      <StyledDiv>
        {mainCategories.map((cat) => (
          <NavContainer key={cat._id}>
            <NavLink href={'/category/' + cat._id} pathname={pathname}>
              {cat.name}
            </NavLink>
          </NavContainer>
        ))}
      </StyledDiv>
      <Wrapper>
        <Title>{category.name}</Title>
        <ProductsGrid products={products} />
      </Wrapper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const category = await Category.findById(context.query.id);
  const catIds = category._id;
  const products = await Product.find({ category: catIds });
  const mainCategories = await Category.find();
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
    },
  };
}
