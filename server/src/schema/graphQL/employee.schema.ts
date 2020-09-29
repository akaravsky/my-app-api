import { GraphQLObjectType, GraphQLString, GraphQLInt } from "graphql";
import CompanyType from "./company.schema";
import fetchEmployeeCompany from "./fetchMethods/fetchEmployeeCompany";

const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    email: { type: GraphQLString },
    likes: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: fetchEmployeeCompany,
    },
  },
});

export default EmployeeType;
