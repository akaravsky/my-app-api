import { GraphQLString } from "graphql";
import UserType from "../types/user.type";
import { signup as signupService } from "../../services/auth";

const signup = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parentValue: any, args: any, request: any) {
    return signupService({
      email: args.email,
      password: args.password,
      req: request,
    });
  },
};

export default signup;
