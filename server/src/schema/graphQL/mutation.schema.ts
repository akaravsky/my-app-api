import User from "../mongoose/user.schema";
import UserType from "./user.schema";

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
} from "graphql";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType, //type that we return in resolve function
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString },
      },
      resolve: async (parentValue: any, { name }: { name: string }) => {
        //MONGO
        const newUser = new User({ name, likes: 0 }); // still not saved in db
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
    updateUserName: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (
        parentValue: any,
        { id, name }: { id: string; name: string }
      ) => {
        //MONGO
        // User.update({name: oldName}, {name: newName}) //update all users with criteria
        // User.findOneAndUpdate({name: oldName}, {name: newName})
        await User.findByIdAndUpdate(id, { name });
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

async function removeUserFromDB(parentValue: any, args: any): Promise<void> {
  //MONGO
  // User.remove({name:name}) //remove all users with criteria
  // User.findOneAndRemove({name: name})
  await User.findByIdAndRemove(args.id, { useFindAndModify: false });
}

export default mutation;
