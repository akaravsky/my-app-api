import { User, UserStatic, Company } from "./graphql.interfaces";
import UserType from "./user.schema";

const graphql = require("graphql");
const { users } = require("../../db");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    /*users: {
      type: new GraphQLList(UserType),
      resolve(parentValue: Company, args: any) {
        return users.allIds.reduce(
          (acc: Array<UserStatic>, userId: keyof typeof users.byId) => {
            const user = users.byId[userId] as UserStatic;
            if (user.companyId === parentValue.id) {
              acc.push(user);
            }
            return acc;
          },
          []
        );
      },
    },*/
  }),
});

export default CompanyType;
