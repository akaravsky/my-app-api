const graphql = require('graphql');
const users = {
    byId: {
        23: { id: 23, firstName: 'Bill', age: 21, companyId: 1 },
        44: { id: 44, firstName: 'Sara', age: 22, companyId: 2 },
        49: { id: 49, firstName: 'Nick', age: 28, companyId: 1 }
    },
    allIds: [23, 44, 49]
};
const companies = {
    byId: {
        1: { id: 1, name: 'Apple', description: 'iphone' },
        2: { id: 2, name: 'Google', description: 'search' }
    },
    allIds: [1, 2]
};
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList } = graphql;
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return users.allIds.reduce((acc, userId) => {
                    const user = users.byId[userId];
                    if (user.companyId === parentValue.id) {
                        acc.push(user);
                    }
                    return acc;
                }, []);
            }
        }
    })
});
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLInt },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return companies.byId[parentValue.companyId];
            }
        }
    }
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                //return users.find(user => user.id === args.id)
                return users.byId[args.id];
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLInt } },
            resolve(parentValue, args) {
                //return users.find(user => user.id === args.id)
                return companies.byId[args.id];
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
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
*/ 
//# sourceMappingURL=schema.js.map