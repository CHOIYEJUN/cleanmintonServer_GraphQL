import {ApolloServer, gql} from "apollo-server";
import { PrismaClient } from './generated/client/index.js'



const prisma = new PrismaClient()

const typeDefs = gql`

    type User {
        seq: Int!
        name: String!
        userId: String!
        password: String!
    }
    
    
    type Query {
        allUser: [User]
        loginUser(userId: String, password: String, seq:Int): User
    }
    `;

const resolvers = {
    Query: {
        allUser: async () => {
            return await prisma.user.findMany(); // Prisma를 사용하여 데이터베이스에서 사용자 정보를 가져옵니다.
        },
        loginUser(_, args) {
            return prisma.user.findUnique({
                where: {
                    userId: args.userId,
                    password: args.password,
                    seq: args.seq
                }
            })
        }

    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});