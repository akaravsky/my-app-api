import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from "graphql";
import CompanyType from "./company.schema";
import UserType from "./user.schema";
import mutation from "./mutation.schema";
import UsersListType from "./usersList.schema";
import CompaniesType from "./companies.schema";

import getUser from "./fetchMethods/getUser";
import fetchCompanies from "./fetchMethods/fetchCompanies";
import fetchCompany from "./fetchMethods/fetchCompany";
import fetchUsers from "./fetchMethods/fetchUsers";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: getUser,
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLInt } },
      resolve: fetchCompany,
    },
    companies: {
      type: CompaniesType,
      args: {},
      resolve: fetchCompanies,
    },
    usersList: {
      type: UsersListType,
      args: {},
      resolve: fetchUsers,
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
