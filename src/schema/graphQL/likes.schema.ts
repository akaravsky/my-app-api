import { GraphQLObjectType, GraphQLInt } from "graphql";

const LikesType = new GraphQLObjectType({
  name: "Likes",
  fields: {
    id: { type: GraphQLInt },
    myLikes: { type: GraphQLInt },
  },
});

module.exports = LikesType;
