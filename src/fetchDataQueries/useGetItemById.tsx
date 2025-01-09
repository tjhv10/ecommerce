import { gql, useQuery } from "@apollo/client";
function useGetItemById(id: number) {
  const GET_ITEM_BY_ID = gql`
      query {
        getItemById(id: ${id}) {
          id
          name
          price
          uploadDate
          description
          sellerName
          status
          categories {
            id
            name
          }
        }
      }
    `;
  const { loading, error, data } = useQuery(GET_ITEM_BY_ID);
  if (error) {
    console.error(`Error! ${error.message}`);
  }
  return !loading && data ? data.getItems : [];
}
export default useGetItemById;
