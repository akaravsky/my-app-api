const graphql = require("graphql");
const User = require("./mongoose.schema");
const { companies, users, likes } = require("../db");
//const fetch = require("node-fetch");

interface IUser {
  id: number;
  name: string;
  age: number;
  companyId?: keyof typeof companies.byId;
}

interface IUsersById {
  [key: number]: IUser;
}

interface IUsers {
  byId: IUsersById;
  allIds: Array<number>;
}

interface ICompany {
  id: number;
  name: string;
  description: string;
}

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue: ICompany, args: any) {
        return users.allIds.reduce(
          (acc: Array<IUser>, userId: keyof typeof users.byId) => {
            const user = users.byId[userId] as IUser;
            if (user.companyId === parentValue.id) {
              acc.push(user);
            }
            return acc;
          },
          []
        );
      },
    },
  }),
});

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
      resolve(parentValue: IUser, args: any) {
        return companies.byId[parentValue.companyId];
      },
    },
  },
});

const UsersListType = new GraphQLList(UserType);

const LikesType = new GraphQLObjectType({
  name: "Likes1",
  fields: {
    id: { type: GraphQLInt },
    myLikes: { type: GraphQLInt },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parentValue: any, args: { id: string }) => {
        //return users.find(user => user.id === args.id)
        //return users.byId[args.id]

        //MONGO
        const userFromDB = await User.findOne({ _id: args.id });
        return { name: userFromDB.name, id: userFromDB._id };
      },
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue: any, args: { id: keyof typeof companies.byId }) {
        //return users.find(user => user.id === args.id)
        return companies.byId[args.id];
      },
    },
    usersList: {
      type: UsersListType,
      args: {},
      resolve: async (parentValue: any, args: any) => {
        const usersFromDB = await User.find({});
        //console.log('DB', usersFromDB);
        //console.log('Loc', users.allIds.map((userId: number) => users.byId[userId]));
        //return users.allIds.map((userId: number) => users.byId[userId]);
        return usersFromDB.map((user: any) => ({
          id: user._id,
          name: user.name,
          likes: user.likes,
        }));
      },
    },
    likes: {
      type: LikesType,
      args: {},
      resolve(parentValue: any, args: any) {
        return likes;
      },
    },
  },
});

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
      resolve: async (parentValue: any, { id }: { id: string }) => {
        //MONGO
        // User.remove({name:name}) //remove all users with criteria
        // User.findOneAndRemove({name: name})
        await User.findByIdAndRemove(id, { useFindAndModify: false });
      },
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

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

/*
query 1
{
  company(id: 1) {
  	name,
  	description
	}
}

query 2
{
   user(id: 23) {
  	firstName,
      age,
      company: {
          name,
          description
      }
	}
}

query 3
{
    company(id: 2) {
        id,
        name,
        description,
        users {
            id,
            firstName,
            age,
            company{
                name
            }
        }
    }
}

query 4
{
    apple: company(id: 1){
        ...companyDetails
    }
    google: company(id: 2){
        ...companyDetails
    }
}
fragment companyDetails on Company {
    id
    name
    description
}

query 5
{
    usersList{
        firstName
    }
}

mutation 1
mutation {
    addUser(firstName: "Bill", age: 40) {
        id,
        firstName,
        age
    }
}
*/
