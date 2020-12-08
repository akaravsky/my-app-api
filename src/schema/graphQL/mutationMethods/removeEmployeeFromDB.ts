import Employee from "../../mongoose/employee.schema";

export default async function removeEmployeeFromDB(
  parentValue: any,
  args: any
): Promise<void> {
  //MONGO
  // Employee.remove({name:name}) //remove all employees with criteria
  // Employee.findOneAndRemove({name: name})
  await Employee.findByIdAndRemove(args.id, { useFindAndModify: false });
}
