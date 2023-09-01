import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';

const StyledHeader = styled.header`
  background-color: #939597;
  color: rgb(51, 51, 51);
  text-decoration: none;
  box-shadow: 0px 5px 16px 1px rgba(147, 149, 151, 1);
  padding-bottom: 10px;
  height: 128px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  gap: 2rem;
`;
const Logo = styled(Link)`
  color: rgb(51, 51, 51);
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #019db1;
    border-bottom: 1px solid #019db1;
  }
`;
const NavLink = styled(Link)`
  color: rgb(51, 51, 51);
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #f5df4d;
    border-bottom: 1px solid #f5df4d;
  }
`;
const StyledLogo = styled.img`
  width: 100px;
  padding: 15px 0;
  opacity: 0.8;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 25px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <StyledLogo src="/logo-gray.png" alt="logo" />
        <Wrapper>
          {/* <Logo href={'/'}>ToyDorado</Logo> */}
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Alle Produkte</NavLink>
            <NavLink href={'/categories'}>Kategorien</NavLink>
            <NavLink href={'/cart'}>Wunschzettel</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
