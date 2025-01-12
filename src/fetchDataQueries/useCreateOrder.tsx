import { gql, useMutation } from "@apollo/client";

export function useCreateOrder() {
  const CREATE_ORDER = gql`
    mutation CreateOrder($createItemsOrderInput: [CreateItemsOrderInput!]!) {
      createItemsOrder(createItemsOrderInput: $createItemsOrderInput) {
        id
      }
    }
  `;

  const [createOrder, { data, error, loading }] = useMutation(CREATE_ORDER);

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { createOrder, data, loading };
}
