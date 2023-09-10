import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import { Title } from '@/components/Title';
import { highlight } from '@/lib/colors';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Categories';
import { Product } from '@/models/Product';
import Link from 'next/link';

import styled from 'styled-components';

const Container = styled.nav`
  padding-top: 250px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Subheader = styled.div`
  position: fixed;
  flex-wrap: wrap;
  top: 160px;
  width: 100%;
  padding: 20px 0 10px 0;
  display: flex;
  justify-content: center;
  gap: 25px;
  margin: 0 auto;

  backdrop-filter: blur(5px);
  z-index: 5;
  //background-color: rgba(147, 149, 151, 1);
  background-color: rgba(241, 241, 241, 0.7);
`;

const NavLink = styled(Link)`
  color: rgb(51, 51, 51);
  text-underline-offset: 0.4rem;
  text-decoration: underline rgba(51, 51, 51, 0.5) solid 1px;
  text-transform: uppercase;
`;
const Wrapper = styled.div`
  margin-bottom: 10px;
  gap: 50px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  max-width: 1000px;
`;

const CategoriesTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 15px;
  margin-top: 40px;
  margin-bottom: 0px;
  width: 100%;
  justify-content: space-between;
  h2 {
    font-size: 1.9rem;
    font-weight: bolder;
    margin-bottom: 0;
  }
  div {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    svg {
      height: 1.1rem;
    }
  }
`;
const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: #555;
`;
const StyledSquareLink = styled(Link)`
  font-size: 1.1rem;
  background-color: rgba(247, 244, 225, 0.5);
  color: rgba(51, 51, 51, 0.8);
  border: 3px solid rgba(221, 221, 221, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  padding: 20px;
  min-height: 100px;
  height: 220px;
  width: 100%;
  border-radius: 8px;
  margin-top: 25px;
`;
const CategoryWrapper = styled.div`
  border-bottom: 3px solid rgba(221, 221, 221, 1);
  padding: 0 30px 50px 30px;
`;

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function CategoriesPage({ mainCategories, categoriesProducts }) {
  return (
    <>
      <Header />
      <Subheader>
        {mainCategories.map((cat) => (
          <NavContainer key={cat._id}>
            <NavLink href={'/category/' + cat._id}>{cat.name}</NavLink>
          </NavContainer>
        ))}
      </Subheader>
      <Container>
        <Title>Kategorien</Title>
        <Wrapper>
          {mainCategories.map((cat) => (
            <CategoryWrapper key={cat._id}>
              <CategoriesTitle>
                <h2>{cat.name}</h2>
                <div>
                  <StyledLink href={'/category/' + cat._id}>
                    mehr Anzeigen
                  </StyledLink>
                </div>
              </CategoriesTitle>

              <CategoryGrid>
                {categoriesProducts[cat._id].map((p) => (
                  <ProductBox {...p} key={p._id} />
                ))}
                {/* <StyledSquareLink href={'/category/' + cat._id}>
                  {' '}
                  mehr anzeigen &rarr;
                </StyledSquareLink> */}
              </CategoryGrid>
            </CategoryWrapper>
          ))}
        </Wrapper>
      </Container>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const products = await Product.find({ category: mainCat._id }, null, {
      limit: 4,
      sort: { _id: -1 },
    });
    categoriesProducts[mainCat._id] = products;
  }

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}
