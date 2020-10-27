const expressGraphQL = require("express-graphql");
import schema from "../schema/graphQL/root.schema";

export const graphqlInit = (app: any) => {
  // Instruct Express to pass on any request made to the '/graphql' route
  // to the GraphQL instance.
  app.use(
    "/graphql",
    expressGraphQL({
      schema,
      graphiql: true,
    })
  );
};
