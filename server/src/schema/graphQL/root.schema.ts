import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from "graphql";
import { User as IUser } from "./graphql.interfaces";
import CompanyType from "./company.schema";
import UserType from "./user.schema";
import mutation from "./mutation.schema";
import UsersListType from "./usersList.schema";

import staticDB from "db";
import User from "schema/mongoose/user.schema";

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
      resolve(
        parentValue: any,
        args: { id: keyof typeof staticDB.companies.byId }
      ) {
        return staticDB.companies.byId[args.id];
      },
    },
    usersList: {
      type: UsersListType,
      args: {},
      resolve: async (parentValue: any, args: any) => {
        const usersFromDB = await User.find({});
        return usersFromDB.map((user: any) => ({
          id: user._id,
          name: user.name,
          likes: user.likes,
        }));
      },
    },
  },
});

async function getUser(parentValue: any, args: { id: string }) {
  const userFromDB = await fetchUserFromDB(args.id);
  return mapUserForFront(userFromDB);
}

async function fetchUserFromDB(id: string) {
  return await User.findOne({ _id: id });
}

function mapUserForFront(user: IUser) {
  return { name: user.name, id: user._id };
}

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
