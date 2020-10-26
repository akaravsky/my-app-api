import { GraphQLString } from "graphql";
import UserType from "../types/user.type";
import { login as loginService } from "../../services/localAuth";

const login = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve(parentValue: any, args: any, request: any) {
    return loginService({
      email: args.email,
      password: args.password,
      req: request,
    });
  },
};

export default login;
