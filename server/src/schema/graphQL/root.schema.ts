import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} from "graphql";
import CompanyType from "./company.schema";
import EmployeeType from "./employee.schema";
import mutation from "./mutation.schema";
import EmployeesListType from "./employeesList.schema";
import CompaniesType from "./companies.schema";

import getEmployee from "./fetchMethods/getEmployee";
import fetchCompanies from "./fetchMethods/fetchCompanies";
import fetchCompany from "./fetchMethods/fetchCompany";
import fetchEmployees from "./fetchMethods/fetchEmployees";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLString } },
      resolve: getEmployee,
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve: fetchCompany,
    },
    companies: {
      type: CompaniesType,
      args: {},
      resolve: fetchCompanies,
    },
    employeesList: {
      type: EmployeesListType,
      args: {},
      resolve: fetchEmployees,
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation,
});
