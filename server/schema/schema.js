const graphql = require('graphql');
const fetch = require("node-fetch");

const stocks = {
    1: {
        name: 'Apple'
    },
    2: {
        name: 'Google'
    }
};


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLSchema
} = graphql;

const MostValuebleStocksType = new GraphQLObjectType({
    name: 'MostValuebleStocks',
    fields: {
        date: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});

const DayType = new GraphQLObjectType({
    name: 'Day',
    fields: {
        date: { type: GraphQLString },
        open: { type: GraphQLFloat },
        close: { type: GraphQLFloat },
        mostValuebleStocksType: {
            type: MostValuebleStocksType,
            resolve(parentValue, args) {
               return stocks[parentValue.mostValuebleStocksId];
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        day: {
            type: DayType,
            args: { date: { type: GraphQLString } },
            resolve(parentValue, args) {
                return fetch('https://financialmodelingprep.com/api/v3/historical-price-full/index/^DJI').then(res => res.json()).then(json => json).then(prices => {
                    const day = prices.historical.find(day => day.date === args.date);
                    day.mostValuebleStocksId = 1;
                    return day
                });
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