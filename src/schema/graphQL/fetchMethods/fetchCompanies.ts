import Company from "../../mongoose/company.schema";

export default async function fetchCompanies(
  parentValue: any,
  args: { id: string }
) {
  return await Company.find({});
}
