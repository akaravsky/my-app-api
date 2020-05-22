import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import CompanyType from "./company.schema";
import { UserStatic } from "./graphql.interfaces";
import staticDB from "db";

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
      resolve(parentValue: UserStatic, args: any) {
        const index = (parentValue.companyId as unknown) as keyof typeof companies.byId;
        const companies = staticDB.companies;
        return companies.byId[index];
      },
    },
  },
});

export default UserType;
