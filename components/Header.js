import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { Bowlby_One } from 'next/font/google';
import { usePathname } from 'next/navigation';
import SearchIcon from './icons/SearchIcon';
import { useContext, useState } from 'react';
import BarsIcon from './icons/Bars';
import CloseIcon from './icons/CloseIcon';
import { CartContext } from './CartContext';

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

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  @media screen and (min-width: 768px) {
    top: -90px;
    min-height: 128px;
    position: sticky;
    // border-bottom: 5px solid #939597;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

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
  color: ${(props) => (props.href === props.pathname ? '#f5df4d' : '#333')};
  &.activeLink {
    color: #f5df4d;
  }
  &.inactiveLink {
    color: rgb(51, 51, 51);
  }
`;
const StyledLogo = styled.div`
  font-size: 2rem;
  padding: 10px 0;
  opacity: 0.7;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: url('/Be_920.jpg');
  background-position: center;

  color: transparent;
  filter: drop-shadow(5px 5px 6px rgba(51, 51, 51, 0.6))
    drop-shadow(-1px -1px 1px #000);

  @media screen and (min-width: 768px) {
    font-size: 3.5rem;
  }
`;
// const StyledLogo = styled.img`
//   width: 100px;
//   padding: 15px 0;
//   opacity: 0.8;
// `;
const StyledNav = styled.nav`
  a {
    display: inline-block;
    min-width: 20px;

    color: rgb(51, 51, 51);
    text-decoration: none;
    text-transform: uppercase;
    &.activeLink {
      color: #f5df4d;
    }
    &.inactiveLink {
      color: rgb(51, 51, 51);
    }
    svg {
      width: 16px;
      height: 16px;
      margin-left: 5px;
    }
  }

  gap: 25px;
  ${(props) =>
    props.mobileNavActive
      ? `
    display: flex;
    position:fixed;
    top:0;
    left:0;
    width:100dvw;
    height:100dvh;
    background-color: #939597;
  `
      : `
    display: none;
  `}
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  flex-direction: column;
  height: 100dvh;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
    height: unset;
    flex-direction: row;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 10px;
  @media screen and (min-width: 768px) {
    align-items: center;
  }

  a {
    display: inline-block;
    min-width: 20px;

    color: rgb(51, 51, 51);
    text-decoration: none;
    text-transform: uppercase;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: inherit;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const pathname = usePathname();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <StyledLogo className={boblyOne.className}>TOYDORADO</StyledLogo>
        <Wrapper>
          {/* <Logo href={'/'}>ToyDorado</Logo> */}
          <StyledNav
            mobileNavActive={mobileNavActive}
            onClick={() => setMobileNavActive((prev) => !prev)}
          >
            <NavLink
              href={'/'}
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              Home
            </NavLink>
            <NavLink
              href={'/products'}
              pathname={pathname}
              onClick={() => setMobileNavActive((prev) => !prev)}
              className={pathname.includes('/products') ? 'activeLink' : ''}
            >
              Alle Produkte
            </NavLink>
            <NavLink
              href={'/categories'}
              pathname={pathname}
              className={
                pathname.includes('/category/') ||
                pathname.includes('/categories')
                  ? 'activeLink'
                  : ''
              }
              onClick={() => setMobileNavActive((prev) => !prev)}
            >
              Kategorien
            </NavLink>
            <NavLink
              href={'/cart'}
              pathname={pathname}
              onClick={() => setMobileNavActive((prev) => !prev)}
              className={pathname.includes('/cart') ? 'activeLink' : ''}
            >
              Wunschzettel({cartProducts.length})
            </NavLink>
            <Link
              href={'/search'}
              pathname={pathname}
              onClick={() => setMobileNavActive((prev) => !prev)}
              className={pathname === '/search' ? 'activeLink' : ''}
            >
              Suchen
              <SearchIcon />
            </Link>
          </StyledNav>
          <SideIcons>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              {mobileNavActive ? <CloseIcon /> : <BarsIcon />}
            </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
