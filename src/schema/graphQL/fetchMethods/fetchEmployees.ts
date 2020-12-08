import Employee from "../../mongoose/employee.schema";

export default async function fetchEmployees(parentValue: any, args: any) {
  const employeesFromDB = await Employee.find({});
  return employeesFromDB.map((employee: any) => ({
    id: employee._id,
    name: employee.name,
    likes: employee.likes,
    company: employee.company,
  }));
}
