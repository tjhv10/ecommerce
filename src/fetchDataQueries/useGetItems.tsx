import { gql, useQuery } from "@apollo/client";
const GET_ITEMS = gql`
  query {
    getItems {
      id
      name
      price
      uploadDate
      description
      sellerName
      status
      imageUrl
      categories {
        name
      }
    }
  }
`;
export function useGetItems() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { data, loading };
}
