import Company from "../../mongoose/company.schema";

export default async function fetchCompany(
  parentValue: any,
  args: { id: string }
) {
  return await Company.findOne({ _id: args.id });
}
