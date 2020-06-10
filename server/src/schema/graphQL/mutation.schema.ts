import User from "../mongoose/user.schema";
import UserType from "./user.schema";

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";

import removeUserFromDB from "./mutationMethods/removeUserFromDB";
import CompanyType from "./company.schema";
import addCompanyToDB from "./mutationMethods/addCompanyToDB";
import removeCompany from "./mutationMethods/removeCompany";
import fetchCompany from "./fetchMethods/fetchCompany";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: addCompanyToDB,
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: removeCompany,
    },
    addUser: {
      type: UserType, //type that we return in resolve function
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: async (
        parentValue: any,
        { name, companyId }: { name: string; companyId: string }
      ) => {
        //MONGO
        const company = await fetchCompany(null, { id: companyId });
        const newUser = new User({ name, company, likes: 0 }); // still not saved in db
        await newUser.save();
        return newUser;
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: removeUserFromDB,
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        companyId: { type: GraphQLString },
      },
      resolve: async (
        parentValue: any,
        { id, name, companyId }: { id: string; name: string; companyId: string }
      ) => {
        //MONGO
        // User.update({name: oldName}, {name: newName}) //update all users with criteria
        // User.findOneAndUpdate({name: oldName}, {name: newName})
        const company = await fetchCompany(null, { id: companyId });
        await User.findByIdAndUpdate(id, { name, company });
        return User.findById(id);
      },
    },
    addLikeToUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue: any, { id }: { id: string }) => {
        /*const user = await User.findOne({_id:id});
                  await user.update({likes: user.likes + 1});*/
        await User.update({ _id: id }, { $inc: { likes: 1 } });
      },
    },
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue: any, args: any, request: any) {},
    },
  },
});

export default mutation;
