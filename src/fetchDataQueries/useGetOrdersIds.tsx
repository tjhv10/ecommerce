import { gql, useQuery } from "@apollo/client";
const GET_ORDERS = gql`
  query {
    getOrdersWithProducts {
      id
    }
  }
`;
export function useGetOrdersIds() {
  const { loading, error, data } = useQuery(GET_ORDERS);

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { data: data ? data.getOrdersWithProducts : null, loading };
}
