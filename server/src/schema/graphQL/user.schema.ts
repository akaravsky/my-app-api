import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import CompanyType from "./company.schema";
import fetchUserCompany from "./fetchMethods/fetchUserCompany";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    likes: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: fetchUserCompany,
    },
  },
});

export default UserType;
