import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import DisplayError from '../../components/ErrorMessage';
import formatMoney from '../../lib/formatMoney';
import OrderStyles from '../../components/styles/OrderStyles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    Order(where: { id: $id }) {
      id
      total
      charge
      items {
        id
        name
        description
        quantity
        price
        photo {
          altText
          image {
            publicUrlTransformed
            filename
          }
          product {
            name
            description
          }
        }
      }
    }
  }
`;

const OrderItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function OrderItem({ orderItem }) {
  const { name, description, photo, price, quantity } = orderItem;
  console.log(orderItem);
  if (!quantity) return null;
  // console.log(product)
  return (
    <OrderItemStyles>
      <img width="100" src={photo?.image?.publicUrlTransformed} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>
          {formatMoney(price * quantity)} -
          <em>
            {quantity} &times; {formatMoney(price)} each
          </em>
        </p>
        <p>{description}</p>
      </div>
    </OrderItemStyles>
  );
}

export default function SingleOrderPage({ query }) {
  const { id } = query;
  const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id,
    },
  });
  // console.log('Single Order Component');
  // console.log({ data });
  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;
  return (
    <div>
      <Head>
        <title>Order Ref: {id}</title>
      </Head>
      <OrderStyles>
        <h1>Order Ref: {id}</h1>
        <p>
          <span>Order Total:</span>
          <span> {formatMoney(data.Order.total)}</span>
        </p>
        <p>
          <span>Items:</span>
          <span>{data.Order.items.length}</span>
        </p>
        <div className="items">
          <ul>
            {data.Order?.items?.map((item) => (
              <OrderItem key={item.id} orderItem={item} />
            ))}
          </ul>
        </div>
        <footer>
          <p>{formatMoney(data.Order.total)}</p>
        </footer>
      </OrderStyles>
    </div>
  );
}
