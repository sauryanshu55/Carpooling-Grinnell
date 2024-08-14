/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRideDetails = /* GraphQL */ `
  query GetRideDetails($id: ID!) {
    getRideDetails(id: $id) {
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
      user {
        name
        email
        phoneNumber
        sub
        __typename
      }
      rideStatus
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listRideDetails = /* GraphQL */ `
  query ListRideDetails(
    $filter: ModelRideDetailsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRideDetails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        dateTime
        isFlexible
        byFlexible
        needReturnRide
        waitTime
        duration
        offer
        rideStatus
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;

export const listIdleRides= 
`
query MyQuery {
  listRideDetails(filter: {rideStatus: {eq: 1}}) {
    items {
      byFlexible
      dateTime
      createdAt
      duration
      id
      isFlexible
      needReturnRide
      offer
      owner
      rideStatus
      updatedAt
      waitTime
      user {
        email
        name
        phoneNumber
        sub
      }
      destination {
        address
        latitude
        longitude
        name
      }
    }
    nextToken
  }
}

`