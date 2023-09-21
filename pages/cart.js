/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Input from '@/components/Input';
import Layout from '@/components/Layout';
import Table from '@/components/Table';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 80px;
`;
const Title = styled.h2`
  margin-bottom: 20px;
`;
const CollWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  padding: 30px;
  background-color: whitesmoke;
  border: 2px solid #f7f4e1;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0;
  padding-right: 10px;
`;
const ProductTitleBox = styled.div`
  margin-bottom: 10px;
`;
const ProductImageBox = styled.div`
  width: 150px;
  height: 150px;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(221, 221, 221, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  img {
    max-height: 100px;
    max-width: 100px;
    border-radius: 5px;

    filter: drop-shadow(-8px 4px 6px rgba(51, 51, 51, 0.5));
  }
`;

const ButtonBox = styled.td`
  vertical-align: bottom;
  text-align: right;
  padding: 15px 0;

  button {
    padding: 5px;
    border: none;
    background: unset;
    cursor: pointer;
  }
  svg {
    width: 1.2rem;
  }
`;
const PriceBox = styled.td`
  padding: 15px 0;
  font-weight: bolder;
  font-size: 1.2rem;
`;

const FormWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;
const CityHolder = styled.div`
  display: flex;
  gap: 5px;
  input:nth-child(1) {
    width: 60%;
  }
`;
const StreetHolder = styled.div`
  display: flex;
  gap: 5px;

  input:nth-child(2) {
    width: 40%;
  }
`;

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  async function goToPayment() {
    const response = {
      name,
      lastName,
      email,
      city,
      postalCode,
      streetAddress,
      streetNumber,
      country,
      cartProducts,
    };
    await axios.post('/api/checkout', response);
    setIsSuccess(true);
    clearCart();
  }
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, '5000');
    }
  }, [isSuccess]);

  function deleteProduct(id) {
    removeProduct(id);
  }

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (isSuccess) {
    return (
      <Layout>
        <Wrapper>
          <CollWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </CollWrapper>
        </Wrapper>
      </Layout>
    );
  }
  return (
    <Layout>
      <Wrapper>
        <CollWrapper>
          <Box>
            <Title>Wunschzettel</Title>
            {!cartProducts?.length && <div>Dein Wunschzettel ist leer</div>}
            {products?.length > 0 && (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Produkt</th>
                      <th>Preis</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                          <ProductTitleBox>{product.title}</ProductTitleBox>
                        </ProductInfoCell>
                        <PriceBox> {product.price}€</PriceBox>
                        <ButtonBox>
                          {' '}
                          <button
                            type="button"
                            onClick={() => deleteProduct(product._id)}
                          >
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </ButtonBox>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td>{productsTotal}€</td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <Title>Anfrage Information</Title>
              <FormWrapper>
                <div>
                  <Input
                    type="text"
                    placeholder="Vorname*"
                    required
                    value={name}
                    name="name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Nachname*"
                    required
                    value={lastName}
                    name="lastName"
                    onChange={(ev) => setLastName(ev.target.value)}
                  />
                  <StreetHolder>
                    <Input
                      type="text"
                      placeholder="Straße*"
                      required
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Nr.*"
                      required
                      value={streetNumber}
                      name="streetNumber"
                      onChange={(ev) => setStreetNumber(ev.target.value)}
                    />
                  </StreetHolder>
                  <CityHolder>
                    <Input
                      type="text"
                      placeholder="PLZ*"
                      required
                      value={postalCode}
                      name="postalCode"
                      onChange={(ev) => setPostalCode(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Ort*"
                      required
                      value={city}
                      name="city"
                      onChange={(ev) => setCity(ev.target.value)}
                    />
                  </CityHolder>
                  <Input
                    type="text"
                    placeholder="Land*"
                    required
                    value={country}
                    name="country"
                    onChange={(ev) => setCountry(ev.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="E-Mail-Adresse*"
                    required
                    value={email}
                    name="email"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </div>
                <Button prmyWide="1" onClick={goToPayment}>
                  Anfrage absenden
                </Button>
              </FormWrapper>
            </Box>
          )}
        </CollWrapper>
      </Wrapper>
    </Layout>
  );
}
