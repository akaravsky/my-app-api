const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users = [
    {id: 1, firstName: 'Bob', age: 44},
    {id: 2, firstName: 'Jay', age: 43}
]

const UserType = new GraphQLObjectType({
    name: 'MyUserTypeName',
    fields: {
        id:{ type: GraphQLInt},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt }
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
})

module.exports = new GraphQLSchema({
    query: RootQuery
});

/*
query

{
  user(id: 1) {
  	id,
  	age
	}
}
*/