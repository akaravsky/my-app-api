const graphql = require('graphql');
//const fetch = require("node-fetch");
const users = [
    { id: 23, firstName: 'Bill', age: 20, companyId: 1 },
    { id: 47, firstName: 'Sara', age: 22, companyId: 2 },
    { id: 49, firstName: 'Nick', age: 28, companyId: 1 }
];
const companies = [
    { id: 1, name: 'Apple', description: 'iphone' },
    { id: 2, name: 'Google', description: 'search' }
];
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
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
                return users.find(user => user.id === args.id);
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});
/*
query
{
  day(date: "2020-01-03") {
    open,
    close
    }
}
*/ 
//# sourceMappingURL=schema.js.map