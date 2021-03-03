import { gql } from 'apollo-server-express';

const users = [
    {
        _id: 1,
        nickname: 'fsjorgeluis',
        password: '123456',
        name: 'Jorge',
        lastName: 'Fernandez',
        email: 'fsjorgeluis@gmail.com',
        address: 'asdasdasd',
        phone1: '152452',
        phone2: '56320',
        group: 3,
        isGroupSupervisor: false,
        isGroupAssistant: false,
        isAux: false,
        isPr: false,
        monthlyReport: () => reports,
        role: 'SuperAdmin',
        status: true
    }
];

const reports = [
    {
        _id: 1,
        month: 'Marzo',
        year: 2021,
        user: () => users[0],
        hour: 10.0,
        publication: 5,
        revisit: 10,
        study: 0,
        note: ''
    }
];

const typeDefs = gql`
    # This "UserRole" enum defines the queryable fields for every user in our data source.
    enum UserRole {
        SuperAdmin
        Admin
        Collaborator
    }

    # This "User" type defines the queryable fields for every user in our data source.
    type User {
        _id: ID!
        nickname: String!
        password: String!
        name: String!
        lastName: String!
        email: String!
        address: String
        phone1: String!
        phone2: String
        group: Int!
        isGroupSupervisor: Boolean!
        isGroupAssistant: Boolean!
        isAux: Boolean!
        isPr: Boolean!
        monthlyReport: [Report!]!
        role: UserRole!
        status: Boolean!
    }

    # This "Report" type defines the queryable fields for every user monthly report in our data source.
    type Report {
        _id: ID
        month: String!
        year: Int!
        user: User!
        hour: Float!
        publication: Int!
        revisit: Int!
        study: Int!
        note: String
    }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
  }
`;

const resolvers = {
    Query: {
        users: () => users,
    },
};

export { typeDefs, resolvers };