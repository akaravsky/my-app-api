import { GraphQLList } from "graphql";
import UserType from "./user.schema";

const UsersListType = new GraphQLList(UserType);

export default UsersListType;
