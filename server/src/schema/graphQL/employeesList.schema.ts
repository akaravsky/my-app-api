import { GraphQLList } from "graphql";
import EmployeeType from "./employee.schema";

const EmployeesListType = new GraphQLList(EmployeeType);

export default EmployeesListType;
