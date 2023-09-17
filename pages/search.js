import Header from '@/components/Header';
import Center from '@/components/Center';
import Input from '@/components/Input';
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ProductsGrid from '@/components/ProductsGrid';
import { debounce } from 'lodash';
import Spinner from '@/components/Spinner';
import Layout from '@/components/Layout';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  width: 60%;
`;
const InputWrapper = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  top: 80px;
  margin: 15px 0;
  width: 100%;
  padding: 5px;
  /* background-color: #eeeeeeaa; */
  z-index: 5;
  transition: background-color 200ms ease-in-out;
  padding-bottom: 15px;
  @media screen and (min-width: 768px) {
    margin: 15px 0;
    top: 65px;
    position: sticky;
    padding-top: 15px;
    background-color: #eeeeeeaa;
    input {
      background-color: whitesmoke;
      border: 1px solid lightgray;
      color: darkgray;
      width: 50%;
    }
  }

  &.nav-colored {
    background-color: #939597;
    position: fixed;
    margin: 0;
    input {
      background-color: darkgray;
      border: 1px solid lightgray;
      color: whitesmoke;
    }
  }
  &.nav-transparent {
    background-color: #eeeeeeaa;
  }
`;
const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase, debouncedSearch]);

  function searchProducts(phrase) {
    axios
      .get('/api/products?phrase=' + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
  }, []);
  const changeNavbarColor = () => {
    if (window.scrollY >= 50) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  return (
    <Layout>
      <Wrapper>
        <InputWrapper
          className={colorChange ? 'nav-colored' : 'nav-transparent'}
        >
          <SearchInput
            autoFocus
            value={phrase}
            onChange={(ev) => setPhrase(ev.target.value)}
            placeholder="Nach Produkten suchen..."
          />
        </InputWrapper>
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h3>Keine Produkte gefunden</h3>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Wrapper>
    </Layout>
  );
}
