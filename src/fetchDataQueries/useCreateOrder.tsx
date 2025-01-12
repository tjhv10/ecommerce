import { gql, useMutation } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder($createItemsOrderInput: [CreateItemsOrderInput!]!) {
    createItemsOrder(createItemsOrderInput: $createItemsOrderInput) {
      id
    }
  }
`;

export function useCreateOrder() {
  const [createOrder, { data, error, loading }] = useMutation(CREATE_ORDER);

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { createOrder, data, loading };
}
