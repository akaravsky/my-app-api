const graphql = require('graphql');
const fetch = require("node-fetch");

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema
} = graphql;

const StockType = new GraphQLObjectType({
    name: 'Day',
    fields: {
        date: { type: GraphQLString },
        open: { type: GraphQLFloat },
        close: { type: GraphQLFloat },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        day: {
            type: StockType,
            args: { date: { type: GraphQLString } },
            resolve(parentValue, args) {
                return fetch('https://financialmodelingprep.com/api/v3/historical-price-full/index/^DJI').then(res => res.json()).then(json => json).then(prices => prices.historical.find(day => day.date === args.date));
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
  day(data: "2020-01-03") {
  	open,
  	close
	}
}
*/