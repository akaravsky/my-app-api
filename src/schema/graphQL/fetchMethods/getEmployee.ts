import Employee from "../../mongoose/employee.schema";
import { Employee as IEmployee } from "../graphql.interfaces";

export default async function getEmployee(parentValue: any, args: { id: string }) {
  const employeeFromDB = await fetchEmployeeFromDB(args.id);
  return mapEmployeeForFront(employeeFromDB);
}

async function fetchEmployeeFromDB(id: string) {
  return await Employee.findOne({ _id: id });
}

function mapEmployeeForFront(employee: IEmployee) {
  return { name: employee.name, id: employee._id, company: employee.company, posts: employee.posts };
}
