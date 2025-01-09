import { gql, useMutation } from "@apollo/client";

export function useCreateOrder() {
  const CREATE_ORDER = gql`
    mutation CreateOrder($itemId: Int!, $orderId: Int!, $amount: Int!) {
      createItemOrder(createItemsOrderInput: { itemId: $itemId, orderId: $orderId, amount: $amount }) {
        id
        itemId
        orderId
      }
    }
  `;

  const [createOrder, { data, error, loading }] = useMutation(CREATE_ORDER);

  if (error) {
    console.error(`Error! ${error.message}`);
  }

  return { createOrder, data, loading };
}
