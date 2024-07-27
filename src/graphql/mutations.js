/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRideDetails = /* GraphQL */ `
  mutation CreateRideDetails(
    $input: CreateRideDetailsInput!
    $condition: ModelRideDetailsConditionInput
  ) {
    createRideDetails(input: $input, condition: $condition) {
      id
      dateTime
      isFlexible
      byFlexible
      needReturnRide
      waitTime
      duration
      offer
      destination {
        address
        name
        latitude
        longitude
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateRideDetails = /* GraphQL */ `
  mutation UpdateRideDetails(
    $input: UpdateRideDetailsInput!
    $condition: ModelRideDetailsConditionInput
  ) {
    updateRideDetails(input: $input, condition: $condition) {
      id
      dateTime
      isFlexible
      byFlexible
      needReturnRide
      waitTime
      duration
      offer
      destination {
        address
        name
        latitude
        longitude
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteRideDetails = /* GraphQL */ `
  mutation DeleteRideDetails(
    $input: DeleteRideDetailsInput!
    $condition: ModelRideDetailsConditionInput
  ) {
    deleteRideDetails(input: $input, condition: $condition) {
      id
      dateTime
      isFlexible
      byFlexible
      needReturnRide
      waitTime
      duration
      offer
      destination {
        address
        name
        latitude
        longitude
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
