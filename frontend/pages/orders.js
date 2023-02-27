import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';
import Link from 'next/link';
import DisplayError from '../components/ErrorMessage';
import formatMoney from '../lib/formatMoney';
import OrderStyles from '../components/styles/OrderStyles';
import OrderItemStyles from '../components/styles/OrderItemStyles';

const USER_ORDER_QUERY = gql`
  query USER_ORDER_QUERY {
    allOrders {
      id
      total
      charge
      user {
        id
      }
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

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  grid-gap: 4rem;
`;

function countItemsInOrder(order) {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
}

export default function OrdersPage() {
  const { data, loading, error } = useQuery(USER_ORDER_QUERY);
  console.log('All Orders Component');
  // console.log({ data });
  if (loading) return <p>Loading ...</p>;
  if (error) return <DisplayError error={error} />;
  const { allOrders } = data;
  console.log(allOrders);
  return (
    <div>
      <Head>
        <title>All Orders</title>
      </Head>
      <h2> You have {allOrders.length} orders</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={order.id}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className="order-meta">
                  <p>
                    {countItemsInOrder(order)} Item
                    {countItemsInOrder(order) === 1 ? '' : `s`}
                  </p>
                  <p>
                    {order.items.length} Product
                    {order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}
