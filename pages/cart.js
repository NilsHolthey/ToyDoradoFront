import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Layout from '@/components/Layout';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  padding-top: 80px;
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
`;

export default function CartPage() {
  const [products, setProducts] = useState([]);
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, []);
  return (
    <Layout>
      <Wrapper>
        <CollWrapper>
          <Box>
            {!cartProducts?.length && <div>Dein Wunschzettel ist leer</div>}
            {cartProducts?.length > 0 && (
              <>
                <h2>Wunschzettel</h2>
                {products.map((product) => (
                  <div key={product._id}> {product.title}</div>
                ))}
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Wunschzettel Information</h2>
              <input type="text" placeholder="Adresse" />
              <input type="text" placeholder="Adresse2" />
              <Button prmyWide="1"> Anfrage absenden</Button>{' '}
            </Box>
          )}
        </CollWrapper>
      </Wrapper>
    </Layout>
  );
}
