import { gql } from 'apollo-server-express';

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const author = [
    {
        name: 'Kate Chopin',
    },
    {
        name: 'Paul Auster',
    }
]

const typeDefs = gql`
    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "UserRole" enum defines the queryable fields for every user in our data source.
    enum UserRole {
        SuperAdmin
        Admin
        Collaborator
    }

    # This "User" type defines the queryable fields for every user in our data source.
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        monthlyReport: [MonthlyReport!]!
        phone1: Int!
        phone2: Int!
        group: Int!
        isGS: Boolean!
        isGA: Boolean!
        isRP: Boolean!
        isAP: Boolean!
        role: UserRole!
    }

    # This "MonthlyReport" type defines the queryable fields for every user monthly report in our data source.
    type MonthlyReport {
        month: String!
        hours: Float!
        publications: Int!
        returnVisits: Int!
        studies: Int!
    }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }
  
  type Author {
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const resolvers = {
    Query: {
        books: () => books,
        authors: () => author,
    },
};

export { typeDefs, resolvers };