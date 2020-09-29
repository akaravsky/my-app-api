import { GraphQLObjectType, GraphQLString } from 'graphql';
import UserType from './types/user.type';
import { signup } from '../services/auth'

const userMutation = new GraphQLObjectType({
    name: 'userMutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, args, request) {
                return signup({ email: args.email, password: args.password, req: request });
            }
        }
    }
})

export default userMutation