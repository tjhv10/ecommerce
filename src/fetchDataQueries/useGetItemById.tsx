import { gql, useQuery } from "@apollo/client";

// Define the query outside the hook
const GET_ITEM_BY_ID = gql`
  query getItemById($id: Int!) {
    getItemById(id: $id) {
      id
      name
      price
      uploadDate
      description
      sellerName
      status
      imageUrl
      categories {
        id
        name
      }
    }
  }
`;

export function useGetItemById(id: number) {
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID, {
    variables: { id },
  });

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { data: data ? data.getItemById : null, loading };
}
