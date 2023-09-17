import styled from 'styled-components';
import ProductBox from './ProductBox';
import { Title } from './Title';
import Link from 'next/link';

const Container = styled.nav`
  margin: 0 auto;
  margin-top: 150px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.div`
  margin-bottom: 10px;
  gap: 50px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1000px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
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

const CategoryWrapper = styled.div`
  border-bottom: 3px solid rgba(221, 221, 221, 1);
  padding: 0 5px 50px 5px;
  @media screen and (min-width: 768px) {
    padding: 0 30px 50px 30px;
  }
`;

export default function CategoriesPageContent({
  mainCategories,
  categoriesProducts,
}) {
  return (
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
            </CategoryGrid>
          </CategoryWrapper>
        ))}
      </Wrapper>
    </Container>
  );
}
