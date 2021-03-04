import { gql } from 'apollo-server-express';
import User from '../models/User.js';

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
        role: 'SUPERADMIN',
        isLogged: true,
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
    # This "Role" enum defines the queryable fields for every user in our data source.
    enum Role {
        SUPERADMIN
        ADMIN
        COLLABORATOR
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
        report: [YearlyReport!]!
        role: Role!
        isLogged: Boolean!
        status: Boolean!
    }

    type Token {
        token: String!
    }

    type Login {
        email: String!
        password: String!
    }

    input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
        phone1: String!
        group: Int!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    type MutationResponse {
        message: String!
        status: Boolean!
    }

    type YearlyReport {
        _id: ID!
        monthlyReport: Report!
    }

    # This "Report" type defines the queryable fields for every user monthly report in our data source.
    type Report {
        _id: ID!
        month: String!
        year: Int!
        user: User!
        hour: Float!
        publication: Int!
        revisit: Int!
        study: Int!
        note: String
    }

  type Query {
    users: [User]
  }
 
  type Mutation {
    register(user: UserInput): MutationResponse!
    login(user: LoginInput): Token
  }
`;

const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        register: async (parent, args, context, info) => {
            try {
                const { user: { name, lastName, email, password, phone1, group } } = args;

                const userExist = await User.findOne({ email });
                if (userExist) {
                    return {
                        message: 'User already exist!',
                        status: false
                    }
                }

                await User.create({
                    name,
                    lastName,
                    email,
                    password,
                    phone1,
                    group
                });

                // console.log(newUser._doc);

                // console.log(JSON.parse(JSON.stringify(args)))
                return {
                    message: 'User created!',
                    status: true
                }
            } catch ({ message }) {
                return {
                    message: message,
                    status: false
                }
            }
        },

    },
};

export { typeDefs, resolvers };