// subscriptions.graphql
import { gql } from "@apollo/client";

export const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscription($createSubscriptionDto: CreateSubscriptionDto!) {
    createSubscription(createSubscriptionDto: $createSubscriptionDto) {
      id
      user {
        id
        fullName
      }
      activity {
        id
        theme
      }
    }
  }
`;

export const REMOVE_SUBSCRIPTION_MUTATION = gql`
  mutation RemoveSubscription($id: Int!) {
    removeSubscription(id: $id)
  }
`;
