import { Employee, EmployeeStatic, Company } from "./graphql.interfaces";
import EmployeeType from "./employee.schema";

const graphql = require("graphql");
const { employees } = require("../../db");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    /*employees: {
      type: new GraphQLList(EmployeeType),
      resolve(parentValue: Company, args: any) {
        return employees.allIds.reduce(
          (acc: Array<EmployeeStatic>, employeeId: keyof typeof employees.byId) => {
            const employee = employees.byId[employeeId] as EmployeeStatic;
            if (employee.companyId === parentValue.id) {
              acc.push(employee);
            }
            return acc;
          },
          []
        );
      },
    },*/
  }),
});

export default CompanyType;
