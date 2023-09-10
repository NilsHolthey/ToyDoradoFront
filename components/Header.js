import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { Bowlby_One } from 'next/font/google';

const boblyOne = Bowlby_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const StyledHeader = styled.header`
  background-color: #939597;
  color: rgb(51, 51, 51);
  text-decoration: none;
  //box-shadow: 0px 5px 36px 1px rgba(147, 149, 151, 1);
  padding-bottom: 10px;
  min-height: 128px;
  position: fixed;
  width: 100%;
  z-index: 10;
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
  }
  /* color: ${(props) =>
    props.href === props.pathName ? '#f5df4d' : '#333'}; */
  .inactiveLink {
    color: #f5df4d;
  }
  .inactiveLink {
    color: rgb(51, 51, 51);
  }
`;
const StyledLogo = styled.div`
  font-size: 3.5rem;
  padding: 10px 0;
  opacity: 0.7;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: url('/Be_920.jpg');
  background-position: center;

  color: transparent;
  filter: drop-shadow(5px 5px 6px rgba(51, 51, 51, 0.6))
    drop-shadow(-1px -1px 1px #000);
`;
// const StyledLogo = styled.img`
//   width: 100px;
//   padding: 15px 0;
//   opacity: 0.8;
// `;
const StyledNav = styled.nav`
  display: flex;
  gap: 25px;
  margin-bottom: 10px;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <StyledLogo className={boblyOne.className}>TOYDORADO</StyledLogo>
        <Wrapper>
          {/* <Logo href={'/'}>ToyDorado</Logo> */}
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>Alle Produkte</NavLink>
            <NavLink href={'/categories'} activeStyle={{ color: 'red' }}>
              Kategorien
            </NavLink>
            <NavLink href={'/cart'}>Wunschzettel(0)</NavLink>
          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
