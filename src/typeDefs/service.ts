export const serviceTypeDefs = `
  type Service {
    id: ID!
    vehicle_id: Int!
    service_type_id: Int!
    service_datetime: String!
    amount: Float!
  }

  input ServiceInput {
    vehicle_id: Int!
    service_type_id: Int!
    service_datetime: String!
    amount: Float!
  }

  type Query {
    getAllServices: [Service!]!
  }

  type Mutation {
    createService(input: ServiceInput!): Service!
    deleteService(id: ID!): Boolean!
  }
`;
